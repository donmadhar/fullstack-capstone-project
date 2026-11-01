const natural = require('natural');

const analyzer = new natural.SentimentAnalyzer(
  'English',
  natural.PorterStemmer,
  'afinn'
);

function analyzeSentiment(text) {
  const tokens = new natural.WordTokenizer().tokenize(String(text || '').toLowerCase());
  return { score: analyzer.getSentiment(tokens), tokens };
}

module.exports = { analyzeSentiment };
