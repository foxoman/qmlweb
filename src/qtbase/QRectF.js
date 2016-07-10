class QRectF extends QmlWeb.QObject {
  constructor(...data) {
    super();
    let args = data;
    if (args.length === 0) {
      args = [0, 0, 0, 0];
    } else if (args.length === 1 && typeof args[1] === "string") {
      const mask = /^\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*x\s*[\d.]+\s*$/;
      if (!args[0].match(mask)) throw new Error("rect expected");
      args[0] = args[0].replace("x", ",");
      args = args[0].split(",").map(x => parseFloat(x.trim(), 10));
    } else if (args.length !== 4) {
      throw new Error("Invalid arguments");
    }
    QmlWeb.createProperties(this, {
      x: { type: "real", initialValue: args[0] },
      y: { type: "real", initialValue: args[1] },
      width: { type: "real", initialValue: args[2] },
      height: { type: "real", initialValue: args[3] }
    });
  }
  toString() {
    return super.$toString(this.x, this.y, this.width, this.height);
  }
}
QRectF.nonNullableType = true;
QmlWeb.QRectF = QRectF;
