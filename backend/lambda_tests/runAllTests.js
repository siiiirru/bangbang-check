// tests/runAllTests.js

const fs = require('fs');
const path = require('path');

// 모든 테스트 파일 경로 가져오기
const testDirectory = path.join(__dirname, './');
const testFiles = fs.readdirSync(testDirectory).filter(file => file.endsWith('.test.js'));

testFiles.forEach(file => {
    const test = require(path.join(testDirectory, file));
    if (typeof test === 'function') {
        console.log(`Running test from ${file}`);
        test();  // 함수 실행
    } else {
        console.warn(`${file} does not export a function`);
    }
});