const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistackDB', { logging: false });

const Page = db.define('page', {
    title: { type: Sequelize.STRING, allowNull: false },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false, get() {
            const url = this.getDataValue('urlTitle')
            return '/wiki/' + url;
        }
    },   //maybe
    content: { type: Sequelize.TEXT, allowNull: false },
    status: { type: Sequelize.ENUM('open', 'closed') },
    date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    hooks: {
        beforeValidate: (page) => {
            if (page.title) {
                var newTitle = page.title.replace(/\s+/g, "_").replace(/\W/g, "");
                page.urlTitle = newTitle;
            } else {
                page.urlTitle = Math.random().toString(36).substring(2, 7);
            }
        }
    }
});

const User = db.define('user', {
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User,
    db: db
}