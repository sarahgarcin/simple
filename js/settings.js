// settings file

const settings = {
	"numberOfColumns" : 3, 
	"tempoBase" : 1500, 
	"gainBase": 100,
	"punctuations":[
		{
			"punctuation": ".",
			"type": "playback",
			"value": 0.5
		},
		{
			"punctuation": ":",
			"type": "playback",
			"value": 0.3
		},
		{
			"punctuation": "+",
			"type": "playback",
			"value": 2
		},
		{
			"punctuation": "!",
			"type": "playback",
			"value": 3
		},
		{
			"punctuation": "-",
			"type": "interval",
			"value": "/2"
		},
		{
			"punctuation": "—",
			"type": "interval",
			"value": "/4"
		},
		{
			"punctuation": "/",
			"type": "gain",
			"value": "/2"
		},
		{
			"punctuation": "*",
			"type": "gain",
			"value": "*2"
		}
	]
}





