
var matrix = [];

$(function() {

	var $matrix = $(".row");
	$matrix.each(function() {
		var m_row = [];
		$(this).find("[state]").each(function() {
			m_row.push(this);
		});
		matrix.push($(this).find("[state]"))
	});

	$('input').keyup(function () { print_text(this.value.toUpperCase()); });

});

function set(row,col,state) {
	matrix[row][col].setAttribute("state",state);
}

function print_letter(letter, x, length) {
	var value = [];

	switch(length){
		case 4:
			value = crop(four[letter],4);
		break;
		case 5:
			value = crop(five[letter],3);
		break;
	}
	
	for (var i = 0; i < value.length; i++) {
		row = value[i];
		for (var j = 0; j < row.length; j++) {
			set(i, x+j,row[j]);
		}
	}
}

function crop(grid,x) {
	var results = [];
	for(var i = 0; i<7; i++){
	    results[i] = grid[i].slice(x, 8);
	}

	return results;
}

function print_text(text) {

	var t0 = new Date().getTime();

	$("[state]").attr("state",1)

	var indices = [], total = 0, index = 0, spaces = 1;
	for (var i = 0; i < text.length; i++) {
		var char = text.charAt(i);
		if(four[char] == undefined){
			indices[i] = 5;
			total+=5;
		} else {
			indices[i] = 4;
			total+=4;
		}
	}
	
	switch(text.length){
		case 1:
		{
			switch(total){
				case 4:
					index=6;
				break;
				case 5:
					index=5;
				break;
			}
		}
		case 2:
		{
			switch(total){
				case 10:
					index=2;
					spaces=2;
				break;
				case 8:
					indices[0] = 5;
					indices[1] = 5;
					index=2;
					spaces=2;
				break;
				case 9:
					indices[0] = 5;
					index=2;
					spaces=2;
				break;
			}
		}
		break;
		case 3:
		{
			switch(total){
				case 12:
					index=1;
				break;
				case 13:
					indices[indices.indexOf(4)] = 5;
				break;
				case 15:
					index=0;
					spaces=0;
				break;
			}
		}
		break;
	}
	for (var i = 0; i < text.length; i++) {
		var char = text.charAt(i);
		print_letter(char, index, indices[i]);
		index += indices[i]+spaces;
	}

	var t1 = new Date().getTime();

	console.log("Printing performance: "+(t1-t0)+" ms");

}

$("form").submit(function(e) {
	e.preventDefault && e.preventDefault();
	print_text(this.text.value);
});