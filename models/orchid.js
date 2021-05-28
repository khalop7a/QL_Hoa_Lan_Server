class Orchid{
    constructor(orchid_id, category, description, humidity, 
                intermediate, location, name, url_m, science_name, warm, note){
        this.orchid_id = orchid_id;
        this.category = category;
        this.description = description;
        this.humidity = humidity;
        this.intermediate = intermediate;
        this.location = location;
        this.science_name = science_name;
        this.name = name;
        this.url_m = url_m;
        this.warm = warm;
        this.note = note;
    }
}

module.exports = Orchid