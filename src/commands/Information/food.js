const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("food")
		.setDescription("testing: food reciped...."),
	async execute(interaction) {
		await interaction.reply("https://api.edamam.com/api/recipes/v2?type=public&q=cake&app_id=e69c3227&app_key=a59e93b9409600bc19a90852d954cc19");
	},
};