class QVector4D extends QmlWeb.QObject {
  constructor(...data) {
    super();
    let args = data;
    if (args.length === 1 && typeof args[1] === "string") {
      args = args[0].split(",").map(x => parseFloat(x.trim(), 10));
      if (args.length !== 4) args = [];
    }
    if (args.length === 0) {
      args = [0, 0, 0, 0];
    } else if (args.length !== 4) {
      throw new Error("Invalid arguments");
    }
    QmlWeb.createProperties(this, {
      x: { type: "real", initialValue: args[0] },
      y: { type: "real", initialValue: args[1] },
      z: { type: "real", initialValue: args[2] },
      w: { type: "real", initialValue: args[3] }
    });
  }
  toString() {
    return super.$toString(this.x, this.y, this.z, this.w);
  }
  dotProduct(a) {
    if (a instanceof QVector4D) {
      return a.x * this.x + a.y * this.y + a.z * this.z + a.w * this.w;
    }
    return 0;
  }
  times(a) {
    if (a instanceof QmlWeb.QMatrix4x4) {
      const t = this;
      return new QVector4D(
        t.x * a.m11 + t.y * a.m21 + t.z * a.m31 + t.w * a.m41,
        t.x * a.m12 + t.y * a.m22 + t.z * a.m32 + t.w * a.m42,
        t.x * a.m13 + t.y * a.m23 + t.z * a.m33 + t.w * a.m43,
        t.x * a.m14 + t.y * a.m24 + t.z * a.m34 + t.w * a.m44
      );
    }
    if (a instanceof QVector4D) {
      const t = this;
      return new QVector4D(t.x * a.x, t.y * a.y, t.z * a.z, t.w * a.w);
    }
    return new QVector4D(this.x * a, this.y * a, this.z * a, this.w * a);
  }
  plus(a) {
    if (a instanceof QVector4D) {
      const t = this;
      return new QVector4D(t.x + a.x, t.y + a.y, t.z + a.z, t.w + a.w);
    }
    return new QVector4D(this.x, this.y, this.z, this.w);
  }
  minus(a) {
    if (a instanceof QVector4D) {
      const t = this;
      return new QVector4D(t.x - a.x, t.y - a.y, t.z - a.z, t.w - a.w);
    }
    return new QVector4D(this.x, this.y, this.z, this.w);
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
  toVector3d() {
    return new QmlWeb.QVector3D(this.x, this.y, this.z);
  }
  fuzzyEquals(a, epsilon = 0.00001) {
    return [this.x - a.x, this.y - a.y, this.z - a.z, this.w - a.w].every(
      delta => Math.abs(delta) <= epsilon
    );
  }
}
QVector4D.nonNullableType = true;
QmlWeb.QVector4D = QVector4D;
