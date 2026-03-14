exports.handler = async function handler() {
  return {
    statusCode: 501,
    body: JSON.stringify({
      error:
        "Scene image generation is not enabled yet. The app is prepared for it, but the image endpoint has not been turned on."
    })
  };
};
