 const DEVICES = {
	iPhone: {
		image: '/images/iPhone.png',
		width: 200,
		height: 324,
		label: 'iPhone',
		models: [
			{name: '6s Plus', number: 'A1634, A1687', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Rose Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name:'6s', number: 'A1633, A1688', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Rose Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: '6 Plus', number: 'A1522, A1524', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Rose Gold',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: '6', number: 'A1549, A1586', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Rose Gold',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: 'SE', number: 'A1662, A1723, A1724', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Rose Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: '5S', number: 'A1453, A1457, A1533', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: '5C', number: 'A1456, A1507, A1529, A1537', colors: [
				{
					trim: 'Yellow'
				},
				{
					trim: 'Blue'
				},
				{
					trim: 'Pink'
				},
				{
					trim: 'White'
				}
			]},
			{name: '5', number: 'A1428, A1429', colors: [
				{
					trim: 'White',
					screen: 'White'
				},
				{
					trim: 'Black',
					screen: 'Black'
				}
			]}
		]
	},
	iPad: {
		image: '/images/iPad.png',
		label: 'iPad',
		width: 300,
		height: 366,
		models: [
			{name: '2', number: 'A1634, A1687', colors: [
				{
					trim: 'White',
					screen: 'White'
				},
				{
					trim: 'Black',
					screen: 'Black'
				}
			]},
			{name:'3', number: 'A1633, A1688', colors: [
				{
					trim: 'White',
					screen: 'White'
				},
				{
					trim: 'Black',
					screen: 'Black'
				}
			]},
			{name: '4', number: 'A1522, A1524', colors: [
				{
					trim: 'White',
					screen: 'White'
				},
				{
					trim: 'Black',
					screen: 'Black'
				}
			]},
			{name: 'Mini', number: 'A1549, A1586', colors: [
				{
					trim: 'White',
					screen: 'White'
				},
				{
					trim: 'Black',
					screen: 'Black'
				}
			]},
			{name: 'Mini 2', number: 'A1662, A1723, A1724', colors: [
				{
					trim: 'White',
					screen: 'White'
				},
				{
					trim: 'Black',
					screen: 'Black'
				}
			]},
			{name: 'Mini 3', number: 'A1453, A1457, A1533', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: 'Mini 4', number: 'A1456, A1507, A1529, A1537', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: 'Air', number: 'A1428, A1429', colors: [
				{
					trim: 'White',
					screen: 'White'
				},
				{
					trim: 'Black',
					screen: 'Black'
				}
			]},
			{name: 'Air 2', number: 'A1428, A1429', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: 'Pro 12.9\'\'', number: 'A1428, A1429', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Rose Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]},
			{name: 'Pro 9.7\'\'', number: 'A1428, A1429', colors: [
				{
					trim: 'Gold',
					screen: 'White'
				},
				{
					trim: 'Silver',
					screen: 'White'
				},
				{
					trim: 'Space Gray',
					screen: 'Black'
				}
			]}
		]

	}
};

 const ISSUES = [
	'Broken Screen',
	'Battery',
	'Water Damage',
	'Won\'t Turn On',
	'Other'
];

module.exports = {
	ISSUES: ISSUES,
	DEVICES: DEVICES
}