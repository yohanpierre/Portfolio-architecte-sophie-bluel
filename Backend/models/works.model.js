
module.exports = (sequelize, DataTypes) => {
	const Works = sequelize.define(
		"works",
		{
		title: {
			type: DataTypes.STRING,
			allowNull: true
			},
		imageUrl: {
			type: DataTypes.STRING,
			allowNull: true
			}
		},
		{timestamps:false}
	)
	return Works
}
