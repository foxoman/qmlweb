/* eslint max-len: 0 */

describe("QtBase.QMatrix4x4", function() {
  it("present", function() {
    expect(!!QmlWeb && !!QmlWeb.QMatrix4x4).toBe(true);
  });

  it("construction", function() {
    expect((new QmlWeb.QMatrix4x4()).toString()).toBe(
      "QMatrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
    );
    var m = new QmlWeb.QMatrix4x4(
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11.1, 12.2, -3, -4.5, 6, 19, 100
    );
    expect(m.toString()).toBe(
      "QMatrix4x4(1, 2, 3, 4, 5, 6, 7, 9, 10, 11.1, 12.2, -3, -4.5, 6, 19, 100)"
    );
  });

  it("plus", function() {
    var i = new QmlWeb.QMatrix4x4();
    var a = new QmlWeb.QMatrix4x4(
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12.25, -3, -4.5, 6, 19, 10
    );
    var b = new QmlWeb.QMatrix4x4(
      1, -1, 5, 0.5, 18, 9, 10, 11, 32, 13, 24, 15, 16, 17, 18, 19
    );
    expect(a.plus(i).toString()).toBe(
      "QMatrix4x4(2, 2, 3, 4, 5, 7, 7, 9, 10, 11, 13.25, -3, -4.5, 6, 19, 11)"
    );
    expect(a.plus(101).toString()).toBe(a.plus(i).toString());
    expect(a.plus(b).toString()).toBe(
      "QMatrix4x4(2, 1, 8, 4.5, 23, 15, 17, 20, 42, 24, 36.25, 12, 11.5, 23, 37, 29)"
    );
    expect(b.plus(a).toString()).toBe(a.plus(b).toString());
  });

  it("minus", function() {
    var i = new QmlWeb.QMatrix4x4();
    var a = new QmlWeb.QMatrix4x4(
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12.25, -3, -4.5, 6, 19, 10
    );
    var b = new QmlWeb.QMatrix4x4(
      1, -1, 5, 0.5, 18, 9, 10, 11, 32, 13, 24, 15, 16, 17, 18, 19
    );
    expect(a.minus(i).toString()).toBe(
      "QMatrix4x4(0, 2, 3, 4, 5, 5, 7, 9, 10, 11, 11.25, -3, -4.5, 6, 19, 9)"
    );
    expect(a.minus(101).toString()).toBe(a.minus(i).toString());
    expect(a.minus(b).toString()).toBe(
      "QMatrix4x4(0, 3, -2, 3.5, -13, -3, -3, -2, -22, -2, -11.75, -18, -20.5, -11, 1, -9)"
    );
    expect(b.minus(a).toString()).toBe(
      "QMatrix4x4(0, -3, 2, -3.5, 13, 3, 3, 2, 22, 2, 11.75, 18, 20.5, 11, -1, 9)"
    );
  });

  it("times", function() {
    var a = new QmlWeb.QMatrix4x4(
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12.25, -3, -4.5, 6, 19, 10
    );
    var b = new QmlWeb.QMatrix4x4(
      1, -1, 5, 0.5, 18, 9, 10, 11, 32, 13, 24, 15, 16, 17, 18, 19
    );
    expect(a.times(2).toString()).toBe(
      "QMatrix4x4(2, 4, 6, 8, 10, 12, 14, 18, 20, 22, 24.5, -6, -9, 12, 38, 20)"
    );
    expect(a.times(b).toString()).toBe(
      "QMatrix4x4(197, 124, 169, 143.5, 481, 293, 415, 344.5, 552, 197.25, 400, 252.75, 871.5, 475.5, 673.5, 538.75)"
    );
    expect(b.times(a).toString()).toBe(
      "QMatrix4x4(43.75, 54, 66.75, -15, 113.5, 266, 448.5, 233, 269.5, 496, 766, 323, 195.5, 446, 748.5, 353)"
    );
  });

  it("determinant", function() {
    var i = new QmlWeb.QMatrix4x4();
    var a = new QmlWeb.QMatrix4x4(
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12.25, -3, -4.5, 6, 19, 10
    );
    var b = new QmlWeb.QMatrix4x4(
      1, -1, 5, 0.5, 18, 9, 10, 11, 32, 13, 24, 15, 16, 17, 18, 19
    );
    var m = new QmlWeb.QMatrix4x4(
      1, -1, 2, 4, 18, 9, 10, 11, 32, 13, 24, 15, 16, 17, 18, 19
    );
    expect(i.determinant()).toBe(1);
    expect(a.determinant()).toBe(-169.25);
    expect(b.determinant()).toBe(3570);
    expect(m.determinant()).toBe(8100);
  });

  it("transposed", function() {
    var i = new QmlWeb.QMatrix4x4();
    var a = new QmlWeb.QMatrix4x4(
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12.25, -3, -4.5, 6, 19, 10
    );
    expect(i.transposed().toString()).toBe(
      "QMatrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
    );
    expect(a.transposed().toString()).toBe(
      "QMatrix4x4(1, 5, 10, -4.5, 2, 6, 11, 6, 3, 7, 12.25, 19, 4, 9, -3, 10)"
    );
  });

  it("inverted", function() {
    var i = new QmlWeb.QMatrix4x4();
    var m = new QmlWeb.QMatrix4x4(
      1, -1, 2, 4, 18, 9, 10, 11, 32, 13, 24, 15, 16, 17, 18, 19
    );
    expect(i.inverted().toString()).toBe(
      "QMatrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
    );
    expect(m.inverted().times(8100) + "").toBe(
      "QMatrix4x4(-160, 866, 8, -474, -1780, 218, -316, 498, 240, -1704, 798, 306, 1500, 690, -480, 90)"
    );
  });
});
