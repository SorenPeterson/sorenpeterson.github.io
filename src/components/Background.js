import React, { Component } from 'react';

class Attractor {
    constructor (a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.x = 0;
        this.y = 0;
    }

    next () {
        let { x, y } = this;
        x = Math.sin(this.a * this.y) - Math.cos(this.b * this.x);
        y = Math.sin(this.c * this.x) - Math.cos(this.d * this.y);
        this.x = x;
        this.y = y;
        return { x, y };
    }
}

class Background extends Component {
    constructor () {
        super();

        let [a, b, c, d] = Array(4).fill(() => {
            let num = Math.random() * 1000;
            return () => {
                return Math.sin(new Date() / num);
            };
        }).map(f => {
            return f();
        });

        this.attractor = new Attractor(a(), b(), c(), d());
        setInterval(() => {
            this.attractor = new Attractor(a(), b(), c(), d());
        }, 0);
    }

    renderCanvas (canvas) {
        let context = canvas.getContext('2d');
        let { width, height } = canvas;
        let imageData = context.getImageData(0, 0, width, height);
        for (let i = 0; i < imageData.data.length / 4; i++) {
            imageData.data[i * 4 + 3] -= 1;
        }
        for (let i = 0; i < 10000; i++) {
            let { x, y } = this.attractor.next();
            x = Math.floor((x + 2) / 4 * width);
            y = Math.floor((y + 2) / 4 * height);
            let location = ((x * width * 4) + (y * 4));
            imageData.data[location++]--;
            imageData.data[location++]--;
            imageData.data[location++]--;
            imageData.data[location++] = 255;
        }
        context.putImageData(imageData, 0, 0);
        setTimeout(() => {
            this.renderCanvas(canvas);
        }, 3);
    }

    render () {
        return <canvas
            ref={this.renderCanvas.bind(this)}
            width="600" height="600"
            />;
    }
}

export default Background;
