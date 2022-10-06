const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

async function getDrink() {
	try {
		const drink = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
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
		// console.log(interaction.options.getString('hexvalue'));
		const drink = await getDrink();
		const contentEmbed = new EmbedBuilder();
		if (interaction.user.id === "686449517985398956") 
		{
			contentEmbed.setTitle("Only Milk for you. Ha ha ha");
			contentEmbed.setColor(0xFFA500);
			contentEmbed.setImage("https://live.staticflickr.com/65535/52407332686_dd2dd3889d_b.jpg");
		}
		else
		{
			contentEmbed.setTitle(drink.data.drinks[0].strDrink);
			contentEmbed.setColor(0xFFA500);
			contentEmbed.setURL(drink.data.drinks[0].strDrinkThumb);
			contentEmbed.setImage(drink.data.drinks[0].strDrinkThumb);
			const arr = [];
			for (let i = 1; i < 16; i++) {
				(drink.data.drinks[0]["strIngredient" + i]) && (drink.data.drinks[0]["strMeasure" + i])
					&& arr.push({ name: drink.data.drinks[0]["strIngredient" + i], value: drink.data.drinks[0]["strMeasure" + i], inline: true });
			}
			contentEmbed.addFields(arr);
		}
		

		await interaction.reply({ embeds: [contentEmbed] });
	},
};
