registerQmlType({
    module: 'QtQuick.Controls',
    name: 'TextArea',
    versions: /.*/,
    constructor: QMLTextArea
});

function QMLTextArea(meta) {
    QMLItem.call(this, meta);

    var self = this;

    var QMLFont = new getConstructor('QtQuick', '2.0', 'Font');
    this.font = new QMLFont(this);

    this.dom.innerHTML = "<textarea></textarea>"
    this.dom.firstChild.style.pointerEvents = "auto";
    this.dom.firstChild.style.width = "100%";
    this.dom.firstChild.style.height = "100%";
    this.dom.firstChild.style.margin = "0";

    createSimpleProperty("string", this, "text", "");

    this.Component.completed.connect(this, function () {
        this.implicitWidth = this.dom.firstChild.offsetWidth;
        this.implicitHeight = this.dom.firstChild.offsetHeight;
    });

    this.textChanged.connect(this, function (newVal) {
        this.dom.firstChild.value = newVal;
    });

    function updateValue(e) {
        if (self.text !== self.dom.firstChild.value) {
            self.text = self.dom.firstChild.value;
        }
    }

    this.dom.firstChild.oninput = updateValue;
    this.dom.firstChild.onpropertychanged = updateValue;
}
