const Dai = artifacts.require('mocks/Dai.sol');
const Rep = artifacts.require('mocks/Rep.sol');
const Zrx = artifacts.require('mocks/Zrx.sol');
const Bat = artifacts.require('mocks/Bat.sol');


contract('Dex', () => {

    let dai, rep, zrx, bat;

    beforeEach(async () => {
        ([dai, bat, rep, zrx] = await Promise.all([Dai.new(), Bat.new(), Rep.new(), Zrx.new()]));
    });

});