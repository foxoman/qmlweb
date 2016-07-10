class QSizeF extends QmlWeb.QObject {
  constructor(...data) {
    super();
    let args = data;
    if (args.length === 0) {
      args = [-1, -1];
    } else if (args.length === 1 && typeof args[1] === "string") {
      args = args[0].split("x").map(x => parseFloat(x.trim(), 10));
      if (args.length !== 2) throw new Error("size expected");
    } else if (args.length !== 2) {
      throw new Error("Invalid arguments");
    }
    QmlWeb.createProperties(this, {
      width: { type: "real", initialValue: args[0] },
      height: { type: "real", initialValue: args[1] }
    });
  }
  toString() {
    return super.$toString(this.width, this.height);
  }
}
QSizeF.nonNullableType = true;
QmlWeb.QSizeF = QSizeF;
