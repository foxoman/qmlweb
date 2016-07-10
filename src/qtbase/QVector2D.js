class QVector2D extends QmlWeb.QObject {
  constructor(...data) {
    super();
    let args = data;
    if (args.length === 1 && typeof args[1] === "string") {
      args = args[0].split(",").map(x => parseFloat(x.trim(), 10));
      if (args.length !== 2) args = [];
    }
    if (args.length === 0) {
      args = [0, 0];
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
  dotProduct(a) {
    if (a instanceof QVector2D) {
      return a.x * this.x + a.y * this.y;
    }
    return 0;
  }
  times(a) {
    if (a instanceof QVector2D) {
      return new QVector2D(this.x * a.x, this.y * a.y);
    }
    return new QVector2D(this.x * a, this.y * a);
  }
  plus(a) {
    if (a instanceof QVector2D) {
      return new QVector2D(this.x + a.x, this.y + a.y);
    }
    return new QVector2D(this.x, this.y);
  }
  minus(a) {
    if (a instanceof QVector2D) {
      return new QVector2D(this.x - a.x, this.y - a.y);
    }
    return new QVector2D(this.x, this.y);
  }
  normalized() {
    return this.times(1 / this.length());
  }
  length() {
    return Math.sqrt(this.dotProduct(this));
  }
  toVector3d() {
    return new QmlWeb.QVector3D(this.x, this.y, 0);
  }
  toVector4d() {
    return new QmlWeb.QVector4D(this.x, this.y, 0, 0);
  }
  fuzzyEquals(a, epsilon = 0.00001) {
    return [this.x - a.x, this.y - a.y].every(
      delta => Math.abs(delta) <= epsilon
    );
  }
}
QVector2D.nonNullableType = true;
QmlWeb.QVector2D = QVector2D;
