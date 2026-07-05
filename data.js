/* ============================================================
   data.js
   All content for the NLP Knowledge Artifact Repository lives here.
   Keeping content separate from rendering logic means each section
   template in render.js can be reused for any data shape below.
   ============================================================ */

// ---------- CONCEPT CARDS (Section A) ----------
const CONCEPT_CARDS = [
  {
    id: "tokenization",
    title: "Tokenization",
    contributor: "Student 1",
    definition:
      "Tokenization is the process of breaking a continuous stream of text into smaller units, called tokens. Tokens are usually words, but they can also be sentences, sub-words, or characters depending on the task.",
    purpose:
      "Raw text cannot be processed directly by NLP algorithms because they operate on discrete units, not free-flowing strings. Tokenization prepares text for every later step in an NLP pipeline, including stop-word removal, stemming, and vectorization.",
    workingPrinciple:
      "A tokenizer scans the input text and splits it at defined boundaries, typically whitespace and punctuation. Rule-based tokenizers use regular expressions, while statistical tokenizers (such as those used in modern transformer models) learn sub-word boundaries from a large training corpus.",
    example: {
      input: "Natural Language Processing is fun.",
      output: ["Natural", "Language", "Processing", "is", "fun", "."],
    },
    advantages: [
      "Simple to implement for most languages",
      "Essential first step; every later technique depends on it",
      "Computationally fast, even on large corpora",
    ],
    limitations: [
      "Word boundaries are language-dependent (e.g. Chinese and Japanese have no whitespace between words)",
      "Punctuation and contractions (e.g. \"don't\") can be split incorrectly by naive tokenizers",
    ],
    applications: ["Search Engines", "Chatbots", "Sentiment Analysis"],
    keyTakeaway:
      "Tokenization is the first preprocessing step in almost every NLP pipeline; get it wrong and every downstream step inherits the error.",
  },
  {
    id: "stopword-removal",
    title: "Stop-word Removal",
    contributor: "Student 1",
    definition:
      "Stop-word removal is the process of filtering out common words (such as \"the\", \"is\", \"and\", \"a\") that occur frequently in a language but carry little distinguishing meaning for most NLP tasks.",
    purpose:
      "Removing stop words reduces the size of the vocabulary and the noise in the data, letting models focus on words that carry more discriminative information.",
    workingPrinciple:
      "Each token from the tokenization step is compared against a predefined stop-word list for the target language. Any token matching the list is removed from the token sequence before further processing.",
    example: {
      input: "The movie was very interesting",
      output: ["movie", "interesting"],
    },
    advantages: [
      "Reduces the feature space significantly, which speeds up training",
      "Improves the signal-to-noise ratio in bag-of-words style models",
    ],
    limitations: [
      "Can remove words that carry meaning in specific contexts (e.g. \"not\" in sentiment analysis reverses meaning)",
      "Stop-word lists are language- and domain-specific and must be maintained",
    ],
    applications: ["Spam Detection", "Search", "Text Classification"],
    keyTakeaway:
      "Stop-word removal keeps the words that carry meaning, but it must be applied carefully in tasks where small function words change the sentiment or meaning of a sentence.",
  },
  {
    id: "stemming",
    title: "Stemming",
    contributor: "Student 1",
    definition:
      "Stemming reduces a word to its root or stem form by stripping suffixes and prefixes, using fixed rules rather than any understanding of grammar.",
    purpose:
      "Stemming reduces vocabulary size by mapping different inflected forms of a word (e.g. \"play\", \"playing\", \"played\") to a single stem, which helps models generalize across word forms.",
    workingPrinciple:
      "A rule-based algorithm, such as the Porter Stemmer, applies a series of suffix-stripping rules to each word. The process does not consult a dictionary, so the resulting stem may not be a valid word.",
    example: {
      input: "Playing",
      output: "Play",
    },
    advantages: [
      "Very fast because it uses simple string-manipulation rules",
      "Easy to implement and requires no external dictionary",
    ],
    limitations: [
      "Can produce invalid or non-dictionary words (e.g. \"studies\" → \"studi\")",
      "Prioritizes speed over linguistic accuracy",
    ],
    applications: ["Information Retrieval / Search", "Text Mining"],
    keyTakeaway:
      "Stemming trades accuracy for speed — useful when processing large volumes of text quickly matters more than grammatical correctness.",
  },
  {
    id: "lemmatization",
    title: "Lemmatization",
    contributor: "Student 2",
    definition:
      "Lemmatization converts a word to its dictionary base form, called a lemma, by considering the word's part of speech and its meaning in context.",
    purpose:
      "Lemmatization normalizes words while preserving actual, valid dictionary words, which is important for tasks where meaning must remain intact.",
    workingPrinciple:
      "A lemmatizer uses a vocabulary and morphological analysis (often with part-of-speech tagging) to map a word to its lemma. For example, it knows that \"better\" lemmatizes to \"good\" only when used as an adjective.",
    example: {
      input: "Running",
      output: "Run",
    },
    advantages: [
      "Produces linguistically valid, real words",
      "More accurate than stemming because it accounts for context and part of speech",
    ],
    limitations: [
      "Slower than stemming because it requires dictionary lookups and often POS tagging",
      "Needs language-specific linguistic resources",
    ],
    applications: ["Chatbots", "Machine Translation"],
    keyTakeaway:
      "Lemmatization trades speed for accuracy — the right choice when correct meaning matters more than processing speed.",
  },
  {
    id: "bag-of-words",
    title: "Bag of Words",
    contributor: "Student 2",
    definition:
      "Bag of Words (BoW) is a text representation method that describes a document as a collection of its word frequencies, ignoring grammar and word order.",
    purpose:
      "Machine learning models require numeric input. BoW converts text into a numeric vector so that documents can be compared, clustered, or classified.",
    workingPrinciple:
      "A vocabulary of all unique words across a set of documents is built. Each document is then represented as a vector where each position corresponds to a vocabulary word, and its value is the number of times that word appears in the document.",
    example: {
      input: "AI AI NLP",
      output: "Vocabulary: [AI, NLP] → Vector: [2, 1]",
    },
    advantages: [
      "Simple to understand and implement",
      "Works reasonably well as a baseline for many text-classification tasks",
    ],
    limitations: [
      "Ignores word order and context entirely (\"dog bites man\" and \"man bites dog\" look identical)",
      "Produces very large, sparse vectors for big vocabularies",
    ],
    applications: ["Spam Detection", "Text Classification"],
    keyTakeaway:
      "Bag of Words is the simplest way to turn text into numbers, but it throws away all information about word order and context.",
  },
  {
    id: "tfidf",
    title: "TF-IDF",
    contributor: "Student 2",
    definition:
      "TF-IDF (Term Frequency – Inverse Document Frequency) is a numeric statistic that measures how important a word is to a specific document within a larger collection of documents.",
    purpose:
      "TF-IDF highlights words that are distinctive to a document while down-weighting words that are common across every document in the collection, which BoW cannot do on its own.",
    workingPrinciple:
      "Term Frequency (TF) measures how often a word appears in a document. Inverse Document Frequency (IDF) measures how rare that word is across all documents. Multiplying TF × IDF gives a score that is high for words that are frequent in one document but rare overall.",
    example: {
      input: "Formula",
      output: "TF-IDF(word) = TF(word) × IDF(word)",
    },
    advantages: [
      "Better than plain Bag of Words at identifying words that matter for a specific document",
      "Still simple and computationally cheap compared to embedding-based methods",
    ],
    limitations: [
      "Still ignores semantics — it cannot tell that \"car\" and \"automobile\" mean the same thing",
      "Sensitive to document collection size and composition",
    ],
    applications: ["Search Engine Ranking", "Keyword Extraction"],
    keyTakeaway:
      "TF-IDF gives higher scores to words that are important to a document specifically, not just words that appear often everywhere.",
  },
];

// ---------- COMPARATIVE ANALYSIS (Section B) ----------
const COMPARISONS = [
  {
    id: "stemming-vs-lemmatization",
    title: "Stemming vs Lemmatization",
    contributor: "Student 1",
    rows: [
      {
        criterion: "Definition",
        left: "Reduces a word to its root by stripping affixes using fixed rules.",
        right: "Reduces a word to its dictionary base form using vocabulary and grammar.",
      },
      {
        criterion: "Working Mechanism",
        left: "Rule-based suffix stripping (e.g. Porter Stemmer); no dictionary lookup.",
        right: "Uses a dictionary and part-of-speech context to find the correct base form.",
      },
      {
        criterion: "Computational Complexity",
        left: "Low — simple string operations, very fast.",
        right: "Higher — requires dictionary lookups and often POS tagging.",
      },
      {
        criterion: "Strengths",
        left: "Fast, lightweight, good for large-scale, speed-sensitive tasks.",
        right: "Linguistically accurate; output is always a valid word.",
      },
      {
        criterion: "Weaknesses",
        left: "Can produce invalid, non-dictionary words.",
        right: "Slower and requires more linguistic resources.",
      },
      {
        criterion: "Suitable Applications",
        left: "Search indexing, large-scale text mining.",
        right: "Chatbots, machine translation, tasks needing precise meaning.",
      },
    ],
    conclusion:
      "Stemming favors speed at the cost of accuracy, while lemmatization favors accuracy at the cost of speed. The right choice depends on whether the downstream task can tolerate imprecise word forms.",
  },
  {
    id: "tf-vs-tfidf",
    title: "TF vs TF-IDF",
    contributor: "Student 1",
    rows: [
      {
        criterion: "Definition",
        left: "Term Frequency: how often a word appears in a document.",
        right: "Term Frequency × Inverse Document Frequency: importance of a word in a document relative to a document collection.",
      },
      {
        criterion: "Working Mechanism",
        left: "Simple count (or normalized count) of word occurrences per document.",
        right: "Multiplies TF by IDF, which down-weights words common across many documents.",
      },
      {
        criterion: "Computational Complexity",
        left: "Very low — a single pass to count words.",
        right: "Slightly higher — requires statistics across the entire document collection.",
      },
      {
        criterion: "Strengths",
        left: "Extremely simple and fast to compute.",
        right: "Distinguishes words that are distinctive to a document from generically common words.",
      },
      {
        criterion: "Weaknesses",
        left: "Cannot tell the difference between a common word and a genuinely important one.",
        right: "Still ignores semantics and word order.",
      },
      {
        criterion: "Suitable Applications",
        left: "Quick word-frequency analysis.",
        right: "Search ranking, keyword extraction, document similarity.",
      },
    ],
    conclusion:
      "TF alone treats every frequent word as important, while TF-IDF corrects this by weighing words against the whole document collection, making it the more useful representation for search and ranking tasks.",
  },
  {
    id: "word2vec-vs-fasttext",
    title: "Word2Vec vs FastText",
    contributor: "Student 2",
    rows: [
      {
        criterion: "Definition",
        left: "A neural embedding technique that represents each whole word as a dense vector based on its context.",
        right: "An extension of Word2Vec that represents words as a combination of character n-grams, in addition to the whole word.",
      },
      {
        criterion: "Working Mechanism",
        left: "Trains a shallow neural network (CBOW or Skip-gram) to predict a word from its context, or vice versa.",
        right: "Trains the same style of model, but each word is broken into sub-word character n-grams, and the word vector is the sum of its n-gram vectors.",
      },
      {
        criterion: "Computational Complexity",
        left: "Moderate — training scales with vocabulary size.",
        right: "Higher — training and storage scale with the number of character n-grams, not just whole words.",
      },
      {
        criterion: "Strengths",
        left: "Captures semantic relationships between words (e.g. king − man + woman ≈ queen).",
        right: "Can generate vectors for out-of-vocabulary and misspelled words using sub-word information; performs well on morphologically rich languages.",
      },
      {
        criterion: "Weaknesses",
        left: "Cannot generate a vector for a word it has never seen during training.",
        right: "Larger model size and slower training compared to Word2Vec.",
      },
      {
        criterion: "Suitable Applications",
        left: "Semantic similarity, recommendation systems, general-purpose word embeddings.",
        right: "Applications with rare words, typos, or morphologically complex languages (e.g. Finnish, Turkish, many Indian languages).",
      },
    ],
    conclusion:
      "Word2Vec is a strong general-purpose embedding method, while FastText's sub-word approach makes it more robust for languages with rich morphology and for text containing rare or misspelled words.",
  },
];

// ---------- WORKFLOW DIAGRAMS (Section C) ----------
const WORKFLOWS = [
  {
    id: "preprocessing-pipeline",
    title: "Complete Text Preprocessing Pipeline",
    contributor: "Student 1",
    steps: [
      "Raw Text",
      "Sentence Segmentation",
      "Tokenization",
      "Case Normalization",
      "Noise Removal",
      "Stop-word Removal",
      "Stemming / Lemmatization",
      "Clean Text",
    ],
  },
  {
    id: "feature-engineering-pipeline",
    title: "Feature Engineering Pipeline",
    contributor: "Student 2",
    steps: [
      "Clean Text",
      "Vocabulary Building",
      "Bag of Words",
      "N-Grams",
      "Term Frequency (TF)",
      "Inverse Document Frequency (IDF)",
      "TF-IDF",
      "Feature Vector",
    ],
  },
  {
    id: "text-to-vector-pipeline",
    title: "Text-to-Vector Transformation Process",
    contributor: "Student 2",
    steps: [
      "Sentence",
      "Tokenization",
      "Representation Choice",
      "One-Hot Encoding",
      "Word2Vec",
      "FastText",
      "Dense Embeddings",
      "Vector Input to NLP Model",
      "Prediction",
    ],
  },
];

// ---------- REAL-WORLD APPLICATIONS (Section D) ----------
const APPLICATIONS = [
  {
    id: "search-engines",
    title: "Search Engines",
    overview:
      "Search engines process billions of queries and documents, matching user intent to the most relevant content in a fraction of a second.",
    conceptsUsed: ["Tokenization", "Stop-word Removal", "TF-IDF"],
    benefits: [
      "Faster and more relevant retrieval of results",
      "Reduced computational load by filtering out non-informative words",
    ],
    example:
      "When a user searches \"best budget laptops 2026\", the engine tokenizes the query, removes low-value words, and uses TF-IDF style scoring across indexed pages to rank the most relevant results first.",
  },
  {
    id: "chatbots",
    title: "Chatbots",
    overview:
      "Conversational agents interpret user messages and generate contextually appropriate responses in real time.",
    conceptsUsed: ["Tokenization", "Lemmatization", "Word Embeddings"],
    benefits: [
      "Better understanding of user intent across different phrasings of the same request",
      "More natural, context-aware responses",
    ],
    example:
      "A customer support chatbot recognizes that \"I want to cancel my order\" and \"cancel order please\" express the same intent after tokenization and lemmatization normalize both sentences.",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    overview:
      "Sentiment analysis automatically classifies text as positive, negative, or neutral, widely used to gauge public and customer opinion at scale.",
    conceptsUsed: ["Tokenization", "Stop-word Removal (used carefully)", "Bag of Words / TF-IDF"],
    benefits: [
      "Enables companies to process large volumes of feedback automatically",
      "Surfaces emerging complaints or praise trends quickly",
    ],
    example:
      "An e-commerce platform analyzes thousands of product reviews to automatically flag a spike in negative sentiment about a specific product defect.",
  },
  {
    id: "machine-translation",
    title: "Machine Translation",
    overview:
      "Machine translation converts text from one language to another while attempting to preserve meaning, tone, and grammar.",
    conceptsUsed: ["Tokenization", "Lemmatization", "Word Embeddings"],
    benefits: [
      "Breaks down language barriers for global communication",
      "Embeddings allow the model to capture meaning rather than doing a literal word-for-word swap",
    ],
    example:
      "Translation services convert a product description from English to Spanish while preserving intended meaning, rather than translating word by word.",
  },
  {
    id: "text-summarization",
    title: "Text Summarization",
    overview:
      "Text summarization condenses long documents into shorter versions while retaining the key information.",
    conceptsUsed: ["Tokenization", "TF-IDF", "Sentence Segmentation"],
    benefits: [
      "Saves reading time for users dealing with large volumes of text",
      "Helps identify the most important sentences or facts in a document",
    ],
    example:
      "A news aggregator generates a three-line summary of a long article by scoring sentences with TF-IDF and selecting the highest-scoring ones.",
  },
];

// ---------- RESEARCH AND INDUSTRY INSIGHTS (Section E) ----------
const RESEARCH_ITEMS = [
  {
    category: "Research Development",
    title: "Efficient Transformer Models",
    summary:
      "Researchers have been working to reduce the high computational cost of transformer-based models (such as BERT and GPT-style architectures) through techniques like model distillation, quantization, and sparse attention. This makes powerful language models usable on smaller devices and in real-time applications.",
  },
  {
    category: "Research Development",
    title: "Multilingual Language Models",
    summary:
      "Models such as mBERT and XLM-R are trained across dozens of languages simultaneously, allowing knowledge learned from high-resource languages (like English) to improve performance on low-resource languages that lack large labeled datasets.",
  },
  {
    category: "Industrial Application",
    title: "Customer Support Automation",
    summary:
      "Companies deploy NLP-powered chatbots and ticket-routing systems to automatically classify, prioritize, and respond to customer queries, reducing response time and support costs at scale.",
  },
  {
    category: "Industrial Application",
    title: "Healthcare Document Analysis",
    summary:
      "Hospitals and healthcare providers use NLP to extract structured information — such as diagnoses, medications, and patient history — from unstructured clinical notes, improving record-keeping and supporting clinical decision-making.",
  },
  {
    category: "Open-Source Framework",
    title: "Hugging Face Transformers",
    summary:
      "An open-source library that provides pre-trained transformer models and a unified API for tasks such as text classification, translation, and summarization, significantly lowering the barrier to using state-of-the-art NLP models.",
  },
];

// ---------- SUSTAINABILITY SECTION ----------
const SUSTAINABILITY_TEXT = `Natural Language Processing has a direct and growing role in supporting sustainable development, particularly by making information and services more accessible to people who have historically been left out of the digital economy.

Language accessibility is one of the clearest examples. Most digital content and services are built around a small number of high-resource languages, primarily English. NLP techniques such as multilingual embeddings and translation models allow information — from educational material to government notices — to be made available in regional and low-resource languages, closing a gap that would otherwise take decades to close manually.

In education, NLP-powered tools support automated grading, personalized learning assistants, and text simplification for learners with different reading levels or learning needs. This extends quality educational support to students in under-resourced schools who may not have access to individual tutoring, directly supporting inclusive and equitable education.

In healthcare, NLP is used to extract meaningful information from clinical notes and patient records, helping doctors make faster, better-informed decisions. Voice-based assistants built on NLP also help patients with visual or motor impairments interact with health services independently.

Government and citizen services benefit as well. Chatbots and automated document processing systems allow citizens to access public services, file complaints, or get information without needing to visit an office in person, which is especially valuable in rural or remote areas with limited government infrastructure.

Alongside these benefits, responsible AI practices must guide how NLP systems are built and deployed. Language models can inherit biases present in their training data, which can lead to unfair or discriminatory outcomes if left unchecked. Building repositories like this one — that explain how these techniques work — supports transparency and helps future practitioners understand not just how to build NLP systems, but how to build them responsibly, with fairness, privacy, and inclusivity in mind.

Ultimately, NLP's contribution to sustainability lies in reducing the friction between people and the information or services they need, particularly for populations that language and literacy barriers have historically excluded.`;

const SDG_CARDS = [
  { code: "SDG 4", title: "Quality Education", note: "Text simplification and automated tutoring extend educational support to underserved learners." },
  { code: "SDG 3", title: "Good Health & Well-Being", note: "Clinical NLP improves record accuracy and supports faster, better-informed healthcare decisions." },
  { code: "SDG 10", title: "Reduced Inequalities", note: "Multilingual NLP brings digital services to speakers of regional and low-resource languages." },
  { code: "SDG 16", title: "Peace, Justice & Strong Institutions", note: "NLP-powered citizen services improve access to government information and reduce administrative friction." },
];

// ---------- REFLECTION NOTES ----------
// NOTE: These are structural placeholders only. Genuine reflections must be
// written by each student in their own words — see the gap report for details.
const REFLECTIONS = [
  {
    student: "Student 1",
    status: "placeholder",
    text: "[Student 1: Replace this placeholder with a genuine first-person reflection — what you personally learned while working on Tokenization, Stop-word Removal, Stemming, the Stemming vs Lemmatization comparison, the TF vs TF-IDF comparison, and the preprocessing workflow diagram. Mention a specific difficulty you ran into and how you resolved it, and where you could apply this knowledge in the future.]",
  },
  {
    student: "Student 2",
    status: "placeholder",
    text: "[Student 2: Replace this placeholder with a genuine first-person reflection — what you personally learned while working on Lemmatization, Bag of Words, TF-IDF, the Word2Vec vs FastText comparison, and the feature engineering / text-to-vector workflow diagrams. Mention a specific difficulty you ran into and how you resolved it, and where you could apply this knowledge in the future.]",
  },
];

// ---------- CONTRIBUTION MATRIX ----------
const CONTRIBUTION_MATRIX = [
  {
    student: "Dhairya Shah (61)",
    contribution:
      "Concept Cards: Tokenization, Stop-word Removal, Stemming · Comparative Analysis: Stemming vs Lemmatization, TF vs TF-IDF · Workflow Diagram: Text Preprocessing Pipeline · Reflection Note",
  },
  {
    student: "Ankush Sharma (68)",
    contribution:
      "Concept Cards: Lemmatization, Bag of Words, TF-IDF · Comparative Analysis: Word2Vec vs FastText · Workflow Diagrams: Feature Engineering Pipeline, Text-to-Vector Transformation · Reflection Note",
  },
  {
    student: "Joint",
    contribution:
      "Applications, Sustainability & Societal Impact, Research & Industry Insights, References, AI Declaration",
  },
];

// ---------- REFERENCES (APA) ----------
const REFERENCES = [
  "Jurafsky, D., & Martin, J. H. (2023). Speech and language processing (3rd ed. draft). Stanford University.",
  "Manning, C. D., Raghavan, P., & Schütze, H. (2008). Introduction to information retrieval. Cambridge University Press.",
  "Mikolov, T., Chen, K., Corrado, G., & Dean, J. (2013). Efficient estimation of word representations in vector space. arXiv preprint arXiv:1301.3781.",
  "Bojanowski, P., Grave, E., Joulin, A., & Mikolov, T. (2017). Enriching word vectors with subword information. Transactions of the Association for Computational Linguistics, 5, 135–146.",
  "Salton, G., & Buckley, C. (1988). Term-weighting approaches in automatic text retrieval. Information Processing & Management, 24(5), 513–523.",
  "Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. Proceedings of NAACL-HLT 2019.",
  "Hugging Face. (2026). Transformers documentation. https://huggingface.co/docs/transformers",
  "Bird, S., Klein, E., & Loper, E. (2009). Natural language processing with Python. O'Reilly Media.",
];

// ---------- AI DECLARATION ----------
const AI_DECLARATION_TEXT = `Artificial Intelligence tools were used in the preparation of this repository to assist with drafting explanations, organizing content into a consistent structure across concept cards and comparison tables, and structuring the overall website layout. All technical content was reviewed by the student group for accuracy before inclusion. The core conceptual understanding, contribution planning, and final review of the repository were carried out by the students named in the Contribution Matrix. This declaration is provided in line with the academic integrity guidelines of the assignment.`;
