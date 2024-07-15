const News = require('../Model/NewsSchema');

const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const postNews = async (req, res) => {
  const { title, category, body } = req.body;
  const photo = req.file.filename; 
  try {
    const newNews = new News({ title, category, body, photo });
    await newNews.save();
    res.status(201).json({ message: 'News added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deletedNews = async (req, res) => {
  const newsId = req.params.id;
  try {
    const deleteNews = await News.findByIdAndDelete(newsId);
    if (!deleteNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatedNews = async (req, res) => {
  const newsId = req.params.id;
  const { title, category, body } = req.body;
  
  // Create an update object
  let updateObject = { title, category, body };

  // If a new photo is uploaded, add it to the update object
  if (req.file) {
    updateObject.photo = req.file.filename;
  }

  try {
    const updateNews = await News.findByIdAndUpdate(
      newsId,
      updateObject,
      { new: true }
    );

    if (!updateNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.json({ message: 'News updated successfully', updateNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getNews,
  postNews,
  updatedNews,
  deletedNews
};
