"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    }
}); //Выход

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
}); //Получение данных

const ratesBoard = new RatesBoard();
const checking = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
checking();
setInterval(checking, 60000); //Текущий курс

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, "Баланс пополнен успешно");
        } else {
            moneyManager.setMessage(true, response.data);
        }
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, "Валюта конвертирована успешно");
        } else {
            moneyManager.setMessage(true, response.data);
        }
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, "Валюта переведена успешно");
        } else {
            moneyManager.setMessage(true, response.data);
        } 
    });
} // Операции с деньгами

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, "Пользователь успешно добавлен");
        } else {
            favoritesWidget.setMessage(true, response.data);
        }
    });
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, "Пользователь успешно удалён");
        } else {
            favoritesWidget.setMessage(true, response.data);
        }
    });
} // Избранное

