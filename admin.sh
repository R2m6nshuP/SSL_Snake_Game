#!/bin/bash

HISTORY_FILE="history.txt"

check_file() {
    [[ ! -f "$HISTORY_FILE" ]] && echo "Error: '$HISTORY_FILE' not found." && return 1
    [[ ! -s "$HISTORY_FILE" ]] && echo "Warning: '$HISTORY_FILE' is empty." && return 1
    return 0
}

print_table_header() {
    printf "%-22s %-12s %-8s %-6s %-10s %-6s\n" "TIMESTAMP" "USER" "MODE" "SCORE" "CAUSE" "TIME"
    printf '%0.s-' {1..68}; echo "" #68 dashes match upper formatinng
}

print_row() {
    local line="$1"
    local ts user mode score cause time_val

    ts=$(echo "$line" | grep -oP '\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}')

    user=$(echo "$line" | cut -d'|' -f1 | sed 's/^\[[^]]*\] //' | xargs) #xargs removes whitespaces
    mode=$(echo "$line" | cut -d'|' -f2 | xargs)
    score=$(echo "$line" | cut -d'|' -f3 | xargs)
    cause=$(echo "$line" | cut -d'|' -f5 | xargs)
    time_val=$(echo "$line" | cut -d'|' -f6 | xargs)

    printf "%-22s %-12s %-8s %-6s %-10s %-6s\n" \
        "$ts" "$user" "$mode" "$score" "$cause" "$time_val"
}

paginate() {
    local page_size="${1:-10}"
    local count=0 line key

    while read -r line; do
        [[ -z "$line" ]] && continue
        print_row "$line"
        ((count++))

        if (( count % page_size == 0 )); then
            read -rp "-- Page $((count / page_size)). Enter=next, q=quit: " key </dev/tty #takes input from cmd line works like less
            [[ "${key,,}" == "q" ]] && break
            print_table_header
        fi
    done
}

 
query_user() {
    check_file || return

    read -rp "Enter username: " username
    [[ -z "$username" ]] && return

    local matches
    matches=$(grep -i "$username |" "$HISTORY_FILE")
    [[ -z "$matches" ]] && echo "No entries found." && return

    echo ""
    print_table_header
    echo "$matches" | paginate 10

    echo ""
    echo "-- Summary --"

    echo "$matches" | awk -F'|' '
    BEGIN {sum_score=0; sum_time=0; wall=0; self=0; n=0}
    {
        score=$3+0
        cause=$5
        time=$6+0
        sum_score+=score; sum_time+=time; n++
        if(cause==" WALL ") wall++
        if(cause==" SELF ") self++
    }
    END {
        if(n==0) exit
        printf "Games: %d\nMean score: %.2f\nMean time: %.2f s\n", n, sum_score/n, sum_time/n
        printf "Wall: %d (%.1f%%)\nSelf: %d (%.1f%%)\n", wall, wall*100/n, self, self*100/n
    }'

    high=$(echo "$matches" | awk -F'|' '{print $3+0}' | sort -n | tail -1) #adding 0 makes it int and removes whitespaces
    echo "High score: $high"
}

  
view_recent() {
    check_file || return
    read -rp "Entries [default 20]: " n
    n="${n:-20}"

    entries=$(tail -n "$n" "$HISTORY_FILE")

    echo ""
    print_table_header
    echo "$entries" | paginate 10
}

 
view_analytics() {
    check_file || return

    data=$(cat "$HISTORY_FILE")

    echo ""
    echo "$data" | awk -F'|' '
    BEGIN {sum=0; max=0; min=999999; n=0}
    {
        score=$3+0
        cause=$5
        sub(/^ +/, "", cause)   
        sub(/ +$/, "", cause)    
        if (cause=="") next
        if (score < 0 || score > 1000) next #checks for validity
        sum+=score; n++
        if(score>max) max=score
        if(score<min) min=score
        deaths[cause]++
        
    }
    END {
        if(n==0) exit
        printf "Games: %d\nMean: %.2f\nMax: %d\nMin: %d\n",n, sum/n, max, min #printf for proper formating echo did misarrangement
        print "Death Types:"
        for (d in deaths) {
            printf "  %-10s : %d (%.1f%%)\n", d, deaths[d], deaths[d]*100/n
        }
    }'
}


 
delete_entries() {
    check_file || return

    read -rp "Delete username: " username
    [[ -z "$username" ]] && return

    sed -i "/$username |/Id" "$HISTORY_FILE" #deleted all lines with that username
    echo "Deleted entries for $username"
}
 
view_sorted() {
    check_file || return

    echo "1) Time  2) Score"
    read -rp "Choice: " c

    echo ""
    print_table_header

    if [[ "$c" == "2" ]]; then
        # sort by score  
        awk -F'|' '{print $3+0 "|" $0}' "$HISTORY_FILE" \
        | sort -t'|' -k1,1nr \
        | cut -d'|' -f2- \
        | paginate 10
    else
        # sort by timestamp (default)
        sort "$HISTORY_FILE" | paginate 10
    fi
}
 
main_menu() {
    while true; do
        echo ""
        echo "=========ADMIN PANEL========="      
        echo "1) Query User"
        echo "2) View Recent"
        echo "3) Analytics"
        echo "4) Delete"
        echo "5) Sort Logs"
        echo "6) Exit"
        echo "============================="
        echo ""
        read -rp "Enter choice [1-6]: " choice

        case "$choice" in
            1) query_user ;;
            2) view_recent ;;
            3) view_analytics ;;
            4) delete_entries ;;
            5) view_sorted ;;
            6) exit ;;
            *) echo "Invalid Input" ;; #other inputs
        esac
    done
}

main_menu