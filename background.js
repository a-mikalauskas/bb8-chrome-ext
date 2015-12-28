Number.prototype.toBase = function (base) {
    var symbols =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var decimal = this;
    var conversion = "";

    if (base > symbols.length || base <= 1) {
        return false;
    }

    while (decimal >= 1) {
        conversion = symbols[(decimal - (base * Math.floor(decimal / base)))] +
            conversion;
        decimal = Math.floor(decimal / base);
    }

    return (base < 11) ? parseInt(conversion) : conversion;
};

function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    var body = document.getElementsByTagName('body')[0];

    copyFrom.textContent = text;
    body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    body.removeChild(copyFrom);
}

chrome.browserAction.onClicked.addListener(function (tab) {

    var re = /boombate\.com\/.*-(\d+)/;

    if ((m = re.exec(tab.url)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var link = 'http://bb8.co/d' + parseInt(m[1]).toBase(62);
        copyTextToClipboard(link);
        alert('Ваша короткая ссылка ' + link + ' скопирована!');
    } else {
        alert('Ошибка: Акция не найдена');
    }
});