const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

async function getDrinks(searchText) {
	try {
		const drinks = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php", { params: { s: searchText } });
		return drinks;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("drinks")
		.setDescription("This will get the list of searched cocktail drinks")
		.addStringOption((option) =>
		option
			.setName("name")
		
			.setDescription("Insert the name of the cocktail you would like to drink now")
			.setRequired(true)
	),
	async execute(interaction) {
		console.log(interaction.options.getString("name"));
		const drinks = await getDrinks(interaction.options.getString("name"));
		const contentEmbeds = drinks.data.drinks.slice(0, 10).map(drink => {
			const contentEmbed = new EmbedBuilder();
			contentEmbed.setTitle(drink.strDrink);
			contentEmbed.setColor(0xFFA500);
			contentEmbed.setURL(drink.strDrinkThumb);
			contentEmbed.setImage(drink.strDrinkThumb);
			return contentEmbed;
		});

		await interaction.reply({ embeds: contentEmbeds });
	},
};
