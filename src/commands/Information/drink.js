const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios')
const { EmbedBuilder } = require('discord.js');

async function getDrink() {
	try {
		const drink = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
		return drink;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("drink")
		.setDescription("This will get a random drink"),
	async execute(interaction) {
		//console.log(interaction.options.getString('hexvalue'));
		const drink = await getDrink();
		const contentEmbed = new EmbedBuilder();
		contentEmbed.setTitle(drink.data.drinks[0].strDrink);
		contentEmbed.setColor(0xFFA500);

		contentEmbed.setURL(drink.data.drinks[0].strDrinkThumb);
		contentEmbed.setImage(drink.data.drinks[0].strDrinkThumb);

		var arr=[];
		for (let i = 1; i < 16; i++) {
			(drink.data.drinks[0]["strIngredient"+i]) && (drink.data.drinks[0]["strMeasure"+i])
				&& arr.push({ name: drink.data.drinks[0]["strIngredient"+i], value: drink.data.drinks[0]["strMeasure"+i], inline: true });
		}

		contentEmbed.addFields(arr);

		await interaction.reply({ embeds: [contentEmbed] });
	},
};
