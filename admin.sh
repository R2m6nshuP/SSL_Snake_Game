#!/bin/bash
echo "===== MENU =====
1. Select user to query
2. View recent game scores
3. View analytics
4. Delete entries
5. Perform log rotation
6. View sorted logs
7. Exit
"
read -p "Enter your choice (1-7): " choice
echo ""
case "$choice" in
    1)
        read -p "Enter username to query about: " username
        echo ""
        if grep -q "] $username |" history.txt; then
        echo "Displaying recent games of $username: "
        grep -E "$username" history.txt | awk -F"|" 'BEGIN {printf "%-10s %-5s %-10s %-10s %-5s\n" ," MODE", "SCORE", " SPEED", " CAUSE" ,"TIME\n"} {printf "%-10s %-5s %-10s %-10s %-5s\n", $2, $3, $4, $5, $6
        sum+=$3 ;time+=$6} END{ printf "\nMean score: %-5s\nAverage time survived: %-5s\n", (sum/NR),(time/NR)}'
        
        else 
            echo "Username invalid"

        fi 

        ;;
    2) 
        echo 2
        ;;
    3)
        echo 1
        ;;
    4)
        echo 1
        ;;
    5)
        echo 1
        ;;
    6)
        echo 1
        ;;
    7)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid input"
        ;;
esac
