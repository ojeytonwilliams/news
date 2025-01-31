const { sourceApi } = require('../../utils/ghost/api');
const getImageDimensions = require('../../utils/get-image-dimensions');
const { currentLocale_i18nISOCode, siteURL } = require('../../config');

module.exports = async () => {
  const site = await sourceApi.settings
    .browse({
      include: 'url'
    })
    .catch(err => {
      console.error(err);
    });

  site.url = siteURL;
  site.lang = currentLocale_i18nISOCode .toLowerCase();

  const logoUrl = 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg'
  site.logo = logoUrl;

  const coverImageUrl = 'https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png';
  site.cover_image = coverImageUrl;
  site.og_image = coverImageUrl;
  site.twitter_image = coverImageUrl;

  const iconUrl = 'https://cdn.freecodecamp.org/universal/favicons/favicon.ico';
  site.icon = iconUrl;
  
  // Determine image dimensions before server runs for structured data
  const logoDimensions = await getImageDimensions(logoUrl);
  const coverImageDimensions = await getImageDimensions(coverImageUrl);

  site.image_dimensions = {
    logo: {
      width: logoDimensions.width,
      height: logoDimensions.height
    },
    cover_image: {
      width: coverImageDimensions.width,
      height: coverImageDimensions.height
    }
  }

  // Set default title across all publications
  site.title = 'freeCodeCamp.org';

  return site;
};
