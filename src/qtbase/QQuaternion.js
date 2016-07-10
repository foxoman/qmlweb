class QQuaternion extends QmlWeb.QObject {
  constructor(...data) {
    super();
    let args = data;
    if (args.length === 0) {
      args = [1, 0, 0, 0];
    } else if (args.length !== 4) {
      throw new Error("Invalid arguments");
    }
    QmlWeb.createProperties(this, {
      scalar: { type: "real", initialValue: args[0] },
      x: { type: "real", initialValue: args[1] },
      y: { type: "real", initialValue: args[2] },
      z: { type: "real", initialValue: args[3] }
    });
  }
  toString() {
    return super.$toString(this.scalar, this.x, this.y, this.z);
  }
}
QQuaternion.nonNullableType = true;
QmlWeb.QQuaternion = QQuaternion;
