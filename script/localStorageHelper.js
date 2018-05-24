store = {
    getSnip: function(key) {
        var snip = JSON.parse(localStorage.getItem(key));
        return snip;
    },
    getsnipList: function() {
        var snipList = JSON.parse(localStorage.getItem("snipList"));
        return snipList;
    },
    addSnip: function(snip) {
        localStorage.setItem(snip.id, JSON.stringify(snip));
        var snipList = JSON.parse(localStorage.getItem("snipList"));

        if (snipList == null) {
            snipList = [];
        }
        snipList.push({
            id: snip.id,
            name: snip.name
        });
        localStorage.setItem("snipList", JSON.stringify(snipList));
    },
    updateSnip: function(snip) {
        localStorage.setItem(snip.id, JSON.stringify(snip));
        var snipList = JSON.parse(localStorage.getItem("snipList"));
        if (snipList == null) {
            snipList = [];
            snipList.push({
                id: snip.id,
                name: snip.name
            });
        } else {
            for (i in snipList) {
                if (snipList[i].id == snip.id) {
                    snipList[i].name = snip.name;
                }
            }
        }
        localStorage.setItem("snipList", JSON.stringify(snipList));
    }
};