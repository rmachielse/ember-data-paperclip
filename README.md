# Ember Data Paperclip
[![Build Status](https://travis-ci.org/rmachielse/ember-data-paperclip.svg)](https://travis-ci.org/rmachielse/ember-data-paperclip)

This addon provides an ember file attribute to use with [rails paperclip](https://github.com/thoughtbot/paperclip).
Please note that this addon is still a work in progress.

## Installation

Add the following to your `package.json` and run `npm install`:

```javascript
  ...
  "ember-data-paperclip": "rmachielse/ember-data-paperclip",
  ...
```

After installation, add the serializer-mixin to your serializer:

```javascript
// app/serializers/application.js

import DS from 'ember-data';
import SerializerMixin from 'ember-data-paperclip/mixins/serializer-mixin';

export default DS.ActiveModelSerializer.extend(SerializerMixin);
```

## Configuration

This addon needs some configuration before you can use it.
Add the following to your `config/environment.js`:

```javascript
// config/environment.js

  ...

  paperclip: {
    path: ':class/:attachment/:id_partition/:style/:filename.jpg'
  },

  ...
```

The variables that are used above are available by default.
If you need other variables or want to override the default ones, there are three ways to do that:

  1. Directly in your config file. For example, if your path begins with `:base`, you can add base like this:
     ```javascript
     // config/environment.js

       ...

       paperclip: {
         path: ':base/:class/:attachment/:id_partition/:style/:filename.jpg',
         base: 'https://files.example.com'
       },

       ...
     ```

  2. By providing them on your model. For example if you want to override `id_partition`:

     ```javascript
     // app/models/product.js

     import DS from 'ember-data';
     import Ember from 'ember';

     export default DS.Model.extend({
       photo: DS.attr('file'),

       id_partition: Ember.computed('id', function() {
         return this.get('id');
       })
     });
     ```

  3. By sending it from the backend. For example with [rails active model serializers](https://github.com/rails-api/active_model_serializers):

     ```ruby
     # app/serializers/product_serializer.rb

     class ProductSerializer < ActiveModel::Serializer
       attributes :id, :photo

       def photo
         if object.photo.present?
           {
             filename: object.photo_file_name
           }
         end
       end
     end
     ```

## Usage

In your model add a `file` attribute:

```javascript
// app/models/product.js

import DS from 'ember-data';

export default DS.Model.extend({
  photo: DS.attr('file')
});
```

### Getting

You can generate urls for different styles like this:

```javascript
var url = product.get('photo').url();
// products/photos/000/000/001/original/data.jpg

var thumbnailUrl = product.get('photo').url('thumbnail');
// products/photos/000/000/001/thumbnail/data.jpg
```

You can retrieve the object URL of the file like this:

```javascript
product.get('photo').objectURL('thumbnail').then((thumbnailObjectURL) => {
  console.log(thumbnailObjectURL);
});
```

You can also retrieve the base64 data URL of the file:

```javascript
product.get('photo').dataURL('thumbnail').then((thumbnailDataURL) => {
  window.open(thumbnailDataURL);
});
```

Utilities to use these urls like computed properties are available as well:

```javascript
import DS from 'ember-data';
import fileURL from 'ember-data-paperclip/utils/file-url';
import dataURL from 'ember-data-paperclip/utils/data-url';
import objectURL from 'ember-data-paperclip/utils/object-url';

export DS.Model.extend({
  photo: DS.attr('file'),

  photoThumbnailURL: fileURL('photo', 'thumbnail'),

  photoThumbnailDataURL: dataURL('photo', 'thumbnail'),

  photoObjectURL: objectURL('photo')
});
```

A template helper is also available:

```handlebars
{{file-url product.photo 'thumbnail'}}
```

### Setting

You can set the file from a file upload like this:

```javascript
  ...

  change: function (e) {
    this.get('product').get('photo').update(e.target.files[0]);
  },

  ...
```

This will cause the following save request:

```javascript
// POST /products/1

{
  "product": {
    "id": 1,
    "photo": "[base64data]"
  }
}
```

The photo will only be sent to your backend when it has changed.
You can also remove the photo:

```javascript
product.get('photo').clear();
product.save();
```

This will send the following to the backend:

```javascript
// POST /products/1

{
  "product": {
    "id": 1,
    "photo": null
  }
}
```

### Limitations
- FormData is not yet supported. Uploads happen using json and base64 at the moment.

## License

This project is released under the [MIT License](LICENSE.md).
