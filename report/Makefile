TARGET = report

CC = pdflatex
BIB = bibtex

 
all: $(TARGET).pdf

$(TARGET).pdf: $(TARGET).tex
	$(CC) $(TARGET).tex
	$(BIB) $(TARGET)
	$(CC) $(TARGET).tex
	$(CC) $(TARGET).tex

clean:
	rm -f *.aux *.log *.out *.toc *.bbl *.blg *.lof *.lot *.fls *.fdb_latexmk *.synctex.gz

clean-all: clean
	rm -f $(TARGET).pdf

.PHONY: all clean clean-all