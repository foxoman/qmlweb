class QPointF extends QmlWeb.QObject {
  constructor(...data) {
    super();
    let args = data;
    if (args.length === 0) {
      args = [0, 0];
    } else if (args.length === 1 && typeof args[1] === "string") {
      args = args[0].split(",").map(x => parseFloat(x.trim(), 10));
      if (args.length !== 2) throw new Error("point expected");
    } else if (args.length !== 2) {
      throw new Error("Invalid arguments");
    }
    QmlWeb.createProperties(this, {
      x: { type: "real", initialValue: args[0] },
      y: { type: "real", initialValue: args[1] }
    });
  }
  toString() {
    return super.$toString(this.x, this.y);
  }
}
QPointF.nonNullableType = true;
QmlWeb.QPointF = QPointF;
