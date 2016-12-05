var EMPTY = 0;
var FILLED = 1;
var MARKED = 2;
var board = [];

function FillCell(cell)
{
	var dashIndex = cell.indexOf('-');
	var row = cell.substring(0, dashIndex);
	var col = cell.substring(dashIndex + 1);
	board[row][col] = FILLED;
}

function EmptyCell(cell)
{
	var dashIndex = cell.indexOf('-');
	var row = cell.substring(0, dashIndex);
	var col = cell.substring(dashIndex + 1);
	board[row][col] = EMPTY;
}

function MarkCell(cell)
{
	var dashIndex = cell.indexOf('-');
	var row = cell.substring(0, dashIndex);
	var col = cell.substring(dashIndex + 1);
	board[row][col] = MARKED;
}

function BuildBoardArray(rows, cols)
{
	for(var i = 0; i < rows; i++)
	{
		board[i] = [];
		for(var j = 0; j < cols; j++)
		{
		  board[i].push(0);
		}
	}
}
  
function BuildBoardHTML(rows, cols)
{
	var $board = $("#boardBody");
	for(var row = 0; row < rows; row++)
	{
		var newRow;
		if ((row+1) % 5 === 0 && row+1 < rows)
		{
			newRow = "<tr class = 'thick-bottom'>";
		}
		else
		{
			newRow = "<tr>";
		}
		for(var col = 0; col < cols; col++)
		{
			if((col+1) % 5 === 0 && col+1 < cols)
			{
				newRow += "<td class ='square empty thick-right' id='" + row + "-" + col + "'/>";
			}
			else
			{
				newRow += "<td class = 'square empty' id='" + row + "-" + col + "'/>";
			}
		}
		newRow += "</tr>";
		$board.append($(newRow));
	}
}
  
function CellIsFilled(cell)
{
	var dashIndex = cell.indexOf('-');
	var row = cell.substring(0, dashIndex);
	var col = cell.substring(dashIndex + 1);

	return board[row][col] ==  FILLED;
}

function UpdateBoard(cell)
{
	var dashIndex = cell.indexOf('-');
	var row = cell.substring(0, dashIndex);
	var col = cell.substring(dashIndex + 1);

	var $cell = $("#" + cell);

	if(board[row][col] == EMPTY)
	{
	$cell.attr('class', 'square empty');
	}
	else if(board[row][col] == FILLED)
	{
	  $cell.attr('class', 'square filled');
	}
	else if(board[row][col] == MARKED)
	{
	  $cell.attr('class', 'square marked');
	}
}

$(function(){
var BOARD_WIDTH = 10;
var BOARD_HEIGHT = 10;

BuildBoardArray(BOARD_HEIGHT, BOARD_WIDTH);

BuildBoardHTML(BOARD_HEIGHT, BOARD_WIDTH);

$(".square").mousedown(function(e){
var id = e.target.id;

if(CellIsFilled(id))
{
	EmptyCell(id);
}
else
{
	FillCell(id);
}

UpdateBoard(id);
});

//right click
$(".square").on('contextmenu', function(event){
	event.preventDefault();

	MarkCell(event.target.id);
	UpdateBoard(event.target.id);
});

});

