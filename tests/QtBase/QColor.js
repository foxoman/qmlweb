describe("QtBase.QColor", function() {
  it("present", function() {
    expect(!!QmlWeb && !!QmlWeb.QColor).toBe(true);
  });

  it("construction", function() {
    var colors = [
      "#abcDEF",
      "#abcdef",
      0xabcdef
    ];
    colors.forEach(function(input) {
      var color = new QmlWeb.QColor(input);
      expect(color.toString()).toBe("#abcdef");
    });
  });

  it("toString", function() {
    var colors = [
      ["transparent", "#00000000"],
      ["#abcDEF", "#abcdef"],
      ["red", "#ff0000"],
      ["#01234567", "#01234567"],
      ["#18d", "#1188dd"]
    ];
    colors.forEach(function(input) {
      var color = new QmlWeb.QColor(input[0]);
      expect(color.toString()).toBe(input[1]);
    });
  });

  it("hsva", function() {
    var colors = [
      [[0, 0, 0], "#000000"],
      [[0, 0, 0, 0], "#00000000"],
      [[0.2, 0.3, 0.4, 0.5], "#80606647"]
    ];
    colors.forEach(function(input) {
      var color = QmlWeb.QColor.hsva.apply(undefined, input[0]);
      expect(color.toString()).toBe(input[1]);
    });
  });

  it("hsla", function() {
    var colors = [
      [[0, 0, 0], "#000000"],
      [[0, 0, 0, 0], "#00000000"],
      [[0.2, 0.3, 0.4, 0.5], "#80788547"]
    ];
    colors.forEach(function(input) {
      var color = QmlWeb.QColor.hsla.apply(undefined, input[0]);
      expect(color.toString()).toBe(input[1]);
    });
  });

  it("comparison", function() {
    var color = new QmlWeb.QColor("#abcDEF");
    expect(color.toString()).toBe("#abcdef");
    // eslint-disable-next-line eqeqeq
    expect(color == "#abcdef").toBe(true);
    // eslint-disable-next-line eqeqeq
    expect(color == "#abcDEF").toBe(false);
    expect(color === "#abcdef").toBe(false);
  });
});
