import useQuotes from './modules/quotes.js';
import { initializeFormListener } from './modules/forms.js';

// Initialize quotes event listener
const quotes = useQuotes();
quotes.advanceQuote();

// Form
initializeFormListener();

