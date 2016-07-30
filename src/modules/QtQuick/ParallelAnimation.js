registerQmlType({
  module: "QtQuick",
  name: "ParallelAnimation",
  versions: /.*/,
  baseClass: "Animation",
  enums: {
    Animation: { Infinite: Math.Infinite }
  },
  properties: {
    animations: "list"
  },
  defaultProperty: "animations"
}, class {
  constructor(meta) {
    callSuper(this, meta);

    this.$runningAnimations = 0;

    this.animationsChanged.connect(this, this.$onAnimationsChanged);

    QmlWeb.engine.$registerStart(() => {
      if (!this.running) return;
      self.running = false; // toggled back by start();
      self.start();
    });
    QmlWeb.engine.$registerStop(() => this.stop());
  }
  $onAnimationsChanged() {
    for (let i = 0; i < this.animations.length; i++) {
      const animation = this.animations[i];
      if (!animation.runningChanged.isConnected(this, this.$animationFinished)) {
        animation.runningChanged.connect(this, this.$animationFinished);
      }
    }
  }
  $animationFinished(newVal) {
    this.$runningAnimations += newVal ? 1 : -1;
    if (this.$runningAnimations === 0) {
      this.running = false;
    }
  }
  start() {
    if (this.running) return;
    this.running = true;
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].start();
    }
  }
  stop() {
    if (!this.running) return;
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].stop();
    }
    this.running = false;
  }
  complete() {
    this.stop();
  }
});
