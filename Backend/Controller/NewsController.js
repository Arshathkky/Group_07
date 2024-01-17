const News = require('../Model/NewsSchema')


const getNews = async (req,res)=> {
    try {
        const news = await News.find();
        res.json(news);
    }
    catch (error){
        console.error(error);
        res.status(500).json({message: 'server error'});
    }
};

const postNews = async (req,res) => {
    const {title,catagary,body} = req.body;
    try{
        const newNews = new News({title,catagary,body});
        await newNews.save();
        res.status(201).json({message: 'News Added successfully'});
    }
    catch (error){
        console.error(error);
        res.status(500).json({message : 'server error'});
    }
}

const deletedNews = async (req,res) => {
    const newsId = req.params.id;
    try{
        const deleteNews = await News.findByIdAndDelete(newsId);
        if(!deleteNews){
            return res.status(404).json({message :'Event not found'});
        }
        res.json({message : 'Event delete successfully'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'server error'});
    }
}

const updatedNews =  async (req,res)=>{
    const newsId = req.params.id
    const {title,catagary,body} = req.body;
    try{
        const updateNews = await News.findByIdAndUpdate(
            newsId,
            {title,catagary,body},
            {new:true}
        );
        if(!updateNews){
            return res.status(404).json({message :" News not found"})
        }
        res.status({message : "News update successfullu",updateNews})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
}

module.exports = {
    getNews,
    postNews,updatedNews,deletedNews
}