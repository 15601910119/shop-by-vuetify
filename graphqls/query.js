const commodityFragment = `
fragment commodity on COMMODITY {
  id,
  name,
  price,
  image,
  price,
  discounted,
  inventory,
  sales,
  rates
}
`;
export const home = `
${commodityFragment}
query home {
  banner(status: ON) {
    data {
      id,
      title,
      link,
      image,
      btntext,
      bgcolor,
    }
  }
  category(status: ON) {
    data {
      id,
      name,
      image
    }
  }
  commodity(status: ONLINE) {
    hots {
      ...commodity
    }
    discounteds {
      ...commodity
    }
    list {
      data(start: 1, size: 6) {
        ...commodity
      }
    }
  }
}
`;
