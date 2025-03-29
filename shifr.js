// массив символов для шифрования
const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

// случайная генерация строки 
function randomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    return result;
}

// шифрование только выбранных слов
function encryptSelectedWords(blockId, wordsToEncrypt) {
    const block = document.querySelector(blockId);
    if (!block) return; 

    let originalText = block.innerHTML;

    const preservedText = originalText.replace(/<br\s*\/?>/g, '___BR___');
    
    let words = preservedText.split(/\s+/); 

    // плавное обновление
    let interval = setInterval(() => {
        let updated = false;
        const newWords = words.map(word => {
            if (wordsToEncrypt.includes(word.replace(/[^a-zA-Z]/g, ''))) { 
                updated = true; 
                return randomString(word.length); 
            } else {
                return word; 
            }
        });

        const newText = newWords.join(' ').replace(/___BR___/g, '<br>');

        if (updated) {
            block.innerHTML = newText;
        } else {
            clearInterval(interval); 
        }
    }, 50); // интервал смены слов
}

document.addEventListener("DOMContentLoaded", function () {
    const textBlockWords = {
        '.text-block': ['archaeological', 'excavations', 'Tunnel', 'office', 'General', 'discovered', 'material', 'corridors', 'long-term'],
        '.text-block2': ['cast', 'expression', 'psychological', 'waves', 'Luminaria', 'radio', 'influence', 'resistance', 'emitted'],
        '.text-block3': ['Looking', 'emotion', 'suffering', 'subordinates', 'endured', 'symbol', 'assume', 'caught', 'face'],
        '.text-block-top': ['Scan', 'petrified', 'face', 'tunnel', 'found', 'artifact', 'unknown', 'remains', 'observed'],
        '.text-block6': ['subordinates', 'expression', 'influence', 'psychological', 'waves', 'exposure', 'altered', 'state']
    };
    
    // шифрование ко всем блокам с этими словами
    for (const [blockId, words] of Object.entries(textBlockWords)) {
        encryptSelectedWords(blockId, words);
    }
});
