class QVector3D extends QmlWeb.QObject {
  constructor(...data) {
    super();
    let args = data;
    if (args.length === 1 && typeof args[1] === "string") {
      args = args[0].split(",").map(x => parseFloat(x.trim(), 10));
      if (args.length !== 3) args = [];
    }
    if (args.length === 0) {
      args = [0, 0, 0];
    } else if (args.length !== 3) {
      throw new Error("Invalid arguments");
    }
    QmlWeb.createProperties(this, {
      x: { type: "real", initialValue: args[0] },
      y: { type: "real", initialValue: args[1] },
      z: { type: "real", initialValue: args[2] }
    });
  }
  toString() {
    return super.$toString(this.x, this.y, this.z);
  }
  crossProduct(a) {
    if (a instanceof QVector3D) {
      return new QVector3D(
        this.y * a.z - this.z * a.y,
        this.z * a.x - this.x * a.z,
        this.x * a.y - this.y * a.x
      );
    }
    return new QVector3D();
  }
  dotProduct(a) {
    if (a instanceof QVector3D) {
      return a.x * this.x + a.y * this.y + a.z * this.z;
    }
    return 0;
  }
  times(a) {
    if (a instanceof QmlWeb.QMatrix4x4) {
      const v = new QmlWeb.QVector4D(this.x, this.y, this.z, 1).times(a);
      return new QVector3D(v.x / v.w, v.y / v.w, v.z / v.w);
    }
    if (a instanceof QVector3D) {
      return new QVector3D(this.x * a.x, this.y * a.y, this.z * a.z);
    }
    return new QVector3D(this.x * a, this.y * a, this.z * a);
  }
  plus(a) {
    if (a instanceof QVector3D) {
      return new QVector3D(this.x + a.x, this.y + a.y, this.z + a.z);
    }
    return new QVector3D(this.x, this.y, this.z);
  }
  minus(a) {
    if (a instanceof QVector3D) {
      return new QVector3D(this.x - a.x, this.y - a.y, this.z - a.z);
    }
    return new QVector3D(this.x, this.y, this.z);
  }
  normalized() {
    return this.times(1 / this.length());
  }
  length() {
    return Math.sqrt(this.dotProduct(this));
  }
  toVector2d() {
    return new QmlWeb.QVector2D(this.x, this.y);
  }
  toVector4d() {
    return new QmlWeb.QVector4D(this.x, this.y, this.z, 0);
  }
  fuzzyEquals(a, epsilon = 0.00001) {
    return [this.x - a.x, this.y - a.y, this.z - a.z].every(
      delta => Math.abs(delta) <= epsilon
    );
  }
}
QVector3D.nonNullableType = true;
QmlWeb.QVector3D = QVector3D;
