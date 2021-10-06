module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
  async rewrites() {
    const rewrites = [
      {
        has: [
          {
            type: "host",
            value: "(?<slug>.*).(localhost|likelist.xyz)",
          },
        ],
        source: "/",
        destination: `/go?slug=:slug`,
      },
    ];

    return {
      beforeFiles: rewrites,
    };
  },
};
