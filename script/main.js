var activeSnip = null;
var editableCodeMirror = null;

$(document).ready(function() {

    $("#snipList").on("click", function(clicked) {
        showSnip();
    });

    $("#btnSave").on("click", function(clicked) {
        save();
        getSnips();
    });

    $("#btnNew").on("click", function(clicked) {
        clear();
    });

    $("#snipType").on("click", function(clicked) {
        var selected = $("#snipType").val();
        changeMode(selected);
    });

    $("#btnBeautifyJavaScript").on("click", function(clicked) {
        var x = js_beautify(editableCodeMirror.getValue());
        editableCodeMirror.setValue(x);
    });

    editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: "javascript",
        theme: "default",
        lineNumbers: true
    });

    getSnips();

    $("#btnBeautifyJavaScript").hide();
});

function changeMode(lang) {
    $("#snipType").val(lang);
    if (lang == "SQL") {
        editableCodeMirror.setOption("mode", "text/x-sql");
        $("#btnBeautifyJavaScript").hide();
    } else if (lang == "Javascript") {
        editableCodeMirror.setOption("mode", "javascript");
        $("#btnBeautifyJavaScript").show();
    }
};

function showSnip() {
    var selected = $("#snipList").val();
    if (selected !== undefined && selected !== null) {
        var snip = store.getSnip(selected);
        editableCodeMirror.setValue(snip.content);
        $("#snipName").val(snip.name);
        activeSnip = snip;
        changeMode(snip.type);
    }
};

function clear() {
    activeSnip = null;
    editableCodeMirror.setValue("");
    $("#snipName").val("");
    $("#snipType").val("none");
};

function getSnips() {
    $('#snipList').empty();
    var snipList = store.getsnipList();
    for (i in snipList) {
        $('#snipList').append($('<option>', {
            value: snipList[i].id,
            text: snipList[i].name
        }));
    }
    var select = document.getElementById('snipList');
    select.size = select.length + 5;
};

function save() {
    if (activeSnip != null) {
        var snip = store.getSnip(activeSnip.id);
        snip = {
            content: editableCodeMirror.getValue(),
            name: $("#snipName").val(),
            id: activeSnip.id,
            type: $("#snipType").val()
        };
        store.updateSnip(snip);
    } else {
        snip = {
            content: editableCodeMirror.getValue(),
            name: $("#snipName").val(),
            id: getFourNumberGuid() + getFourNumberGuid(),
            type: $("#snipType").val()
        };
        store.addSnip(snip);
    }
    activeSnip = snip;
};

function getFourNumberGuid() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};