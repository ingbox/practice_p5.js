import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() { // 인스턴스 객체 초기화 매서드(getHtml) 호출 전
        super();
        this.setTitle("WhatTheFuck");
        // console.log(myp5)

        this.s = function( p ) {

            p.setup = function() {
            p.createCanvas(700, 410);
            };

            p.draw = function() {
                p.background(255);
                p.fill(180);

            };
        };

    }


    async getHtml() {

        return `
        `;
    }
}