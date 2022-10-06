const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

async function getCocktail(searchText) {
	try {
		const cocktail = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php", { params: { s: searchText } });
		return cocktail;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("cocktail1")
		.setDescription("This will get the cocktail")
		.addStringOption((option) =>
		option
			.setName("name")
			.setDescription("Insert the name of the cocktail you would like to drink now")
			.setRequired(true)
	),
	async execute(interaction) {
		console.log(interaction.options.getString("name"));
		const cocktail = await getCocktail(interaction.options.getString("name"));
		const contentEmbed = new EmbedBuilder();
		const drink = cocktail.data.drinks[0];
		contentEmbed.setTitle(drink.strDrink);
		contentEmbed.setColor(0xFFA500);
		contentEmbed.setURL(drink.strDrinkThumb);
		contentEmbed.setImage(drink.strDrinkThumb);

		await interaction.reply({ embeds: [contentEmbed] });
	},
};
