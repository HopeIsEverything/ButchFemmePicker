var colors = ["#3F48CC", "#A349A4", "#FFAEC9"],
rgb = [[63, 72, 204], [163, 73, 164], [255, 174, 201]],
labels = ["Butch", "Futch", "Femme"],
label = $("#label"),
slider = $("#slider"),
saveChar = $("#savechar"),
loadChar = $("#loadchar"),
charName = $("#charname"),
comment = $("#comment"),
saveText = $("#savetext"),
loadText = $("#loadtext"),
charCode = $("#charcode");
console.log(handle);

function mixColors(r1, g1, b1, r2, g2, b2, percent)
{
	var complementary = 1 - percent,
	newR = Math.floor(r1 * percent + r2 * complementary),
	newG = Math.floor(g1 * percent + g2 * complementary),
	newB = Math.floor(b1 * percent + b2 * complementary);
	
	return "rgb(" + newR + ", " + newG + ", " + newB + ")";
}

function refreshSlider(method)
{
	var value = slider.slider("value"),
	backgroundString = "",
	stopValue = "",
	color = "",
	text = "";
	
	if(value <= 40)
	{
		stopValue = 100 - value;
		
		backgroundString += "linear-gradient(to right, ";
		backgroundString += colors[0] + ", " + colors[0] + " " + stopValue + "%";
		backgroundString += ", ";
		backgroundString += colors[1] + " " + stopValue + "%, " + colors[1];
		backgroundString += ")";
		
		handle.css("background", backgroundString);
		
		color = mixColors(rgb[0][0], rgb[0][1], rgb[0][2], rgb[1][0], rgb[1][1], rgb[1][2], stopValue / 100);
		
		text = labels[0];
	}
	else if(value <= 60)
	{
		var original = Math.abs(50 - value) * 5,
		complementary = 100 - (Math.abs(50 - value) * 5),
		
		percentageOne = Math.floor(40 / value * 100) + "%";
		
		if(value < 50)
		{
			backgroundString += "linear-gradient(to right, ";
			backgroundString += colors[0] + ", " + colors[0] + " " + original + "%",
			backgroundString += ", ";
			backgroundString += colors[1] + " " + original + "%, " + colors[1];
			backgroundString += ")";
			
			color = mixColors(rgb[0][0], rgb[0][1], rgb[0][2], rgb[1][0], rgb[1][1], rgb[1][2], original / 100);
		}
		else
		{
			backgroundString += "linear-gradient(to right, ";
			backgroundString += colors[1] + ", " + colors[1] + " " + complementary + "%";
			backgroundString += ", ";
			backgroundString += colors[2] + " " + complementary + "%, " + colors[2];
			backgroundString + ")";
			
			color = mixColors(rgb[1][0], rgb[1][1], rgb[1][2], rgb[2][0], rgb[2][1], rgb[2][2], complementary / 100);
		}
		
		handle.css("background", backgroundString);
		
		text = labels[1];
	}
	else
	{
		stopValue = 100 - value;
		
		backgroundString += "linear-gradient(to right, ";
		backgroundString += colors[1] + ", " + colors[1] + " " + stopValue + "%";
		backgroundString += ", ";
		backgroundString += colors[2] + " " + stopValue + "%, " + colors[2];
		backgroundString += ")";
		
		handle.css("background", backgroundString);
		
		color = mixColors(rgb[1][0], rgb[1][1], rgb[1][2], rgb[2][0], rgb[2][1], rgb[2][2], stopValue / 100);
		
		text = labels[2];
	}
	
	label.css("color", color);
	label.text(text);
	label.animate({left: value * 6 - 300 + "px"}, 2, "easeInBack");
	
	saveChar.css("color", color);
	saveChar.css("border", "solid 5px " + color);
	
	loadChar.css("color", color);
	loadChar.css("border", "solid 5px " + color);
}

$("#slider").slider({
	orientation: "horiontal",
	range: "min",
	max: 100,
	value: 50,
	slide: refreshSlider,
	change: refreshSlider
});

function saveCharacter(e)
{
	var text = charName.val() + ":" + $("#slider").slider("value") + ":" + $("#comment").val();
	
	saveText.text(text);
}

saveChar.click(saveCharacter);

function loadCharacter()
{
	var code = charCode.val(),
	split = code.split(":");
	
	if(split.length != 3)
	{
		loadText.text("Invalid character code :(");
		
		return false;
	}
	
	charName.val(split[0]);
	slider.slider("value", parseInt(split[1]));
	comment.val(split[2]);
	
	loadText.text("Character loaded successfully!");
	loadText.animate({color: "#FFF"}, 1000, "linear");
	loadText.animate({color: "#000"}, 1500, "linear");
	
}

loadChar.click(loadCharacter);

var handle = $("#slider .ui-slider-handle");

refreshSlider();