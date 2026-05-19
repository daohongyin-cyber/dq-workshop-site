const asset = (relativePath) => encodeURI(relativePath);

const heroWorkId = "poster-03";
const featuredWorkIds = ["deep-sea-poster", "street-ip-trio"];

const creators = [
  {
    id: "poster",
    name: "海报方向",
    role: "主题海报 / 展陈海报",
    city: "工作室内部",
    availability: "当前可接排版与主题视觉项目",
    price: "价格按项目评估",
    cycle: "周期视复杂度而定",
    bio:
      "这一组更偏强排版、强画面和主题视觉表达，适合品牌活动海报、展陈海报和内容型封面项目。",
    services: ["海报视觉", "主题排版", "封面设计"],
    initials: "海",
  },
  {
    id: "brand-ip",
    name: "品牌 IP 方向",
    role: "角色形象 / 标识图形",
    city: "工作室内部",
    availability: "当前可接品牌与形象项目",
    price: "价格按项目评估",
    cycle: "周期视复杂度而定",
    bio:
      "这一组偏潮玩角色、品牌标识和图形延展，适合餐饮品牌、潮流服饰和年轻化 IP 企划。",
    services: ["品牌 IP", "角色设定", "标识图形"],
    initials: "牌",
  },
  {
    id: "model",
    name: "三维方向",
    role: "角色建模 / 空间方案",
    city: "工作室内部",
    availability: "当前可接建模与渲染项目",
    price: "价格按项目评估",
    cycle: "周期视复杂度而定",
    bio:
      "这一组偏三维建模和空间表现，既有角色白模，也有舞台和装置方向的方案图。",
    services: ["三维建模", "角色白模", "空间方案"],
    initials: "三",
  },
  {
    id: "sculpt",
    name: "头雕方向",
    role: "头雕 / 胸像 / 上色",
    city: "工作室内部",
    availability: "当前可接头雕与胸像项目",
    price: "价格按项目评估",
    cycle: "周期视复杂度而定",
    bio:
      "这一组偏头像塑形、胸像气质和上色表现，适合写实头雕、角色胸像和收藏向造型展示。",
    services: ["头雕造型", "胸像塑形", "上色表现"],
    initials: "雕",
  },
];

const categoryMeta = {
  海报视觉: {
    deliverables: ["主海报", "主题排版", "图文合成"],
    suitable: ["品牌活动海报", "展陈海报", "内容型封面"],
    description:
      "这一张更适合作为海报方向的样本，重点是让来访者快速理解你的排版、图像组织和画面节奏能力。",
  },
  品牌IP: {
    deliverables: ["标识图形", "角色设定", "品牌延展"],
    suitable: ["餐饮品牌", "潮流品牌", "年轻化形象"],
    description:
      "这一张更适合作为品牌 IP 方向的样本，重点是让来访者知道你不仅能做角色，也能做标识、图形和视觉延展。",
  },
  三维建模: {
    deliverables: ["建模展示", "材质表现", "空间方案"],
    suitable: ["角色建模", "展示空间", "三维视觉"],
    description:
      "这一张更适合作为三维方向的样本，重点是让来访者快速理解你的结构、体量和空间表现能力。",
  },
  头雕: {
    deliverables: ["头雕造型", "胸像塑形", "上色表现"],
    suitable: ["写实头雕", "角色胸像", "收藏向造型"],
    description:
      "这一张更适合作为头雕方向的样本，重点是让来访者看到你在结构、气质和细部塑造上的处理能力。",
  },
};

function cardRatio(width, height) {
  const ratio = width / height;
  if (ratio >= 1.35) return "4 / 3";
  if (ratio >= 1.0) return "1 / 1";
  if (ratio >= 0.8) return "4 / 5";
  return "3 / 5";
}

function cardSize(width, height) {
  const ratio = width / height;
  if (ratio >= 1.1) return "medium";
  if (ratio >= 0.8) return "short";
  return "tall";
}

function makeWork({
  id,
  title,
  category,
  creatorId,
  file,
  width,
  height,
  summary,
  description,
  year = "近期",
  deliverables,
  suitable,
}) {
  const meta = categoryMeta[category];
  return {
    id,
    title,
    category,
    creatorId,
    year,
    size: cardSize(width, height),
    ratio: cardRatio(width, height),
    width,
    height,
    cover: asset(file),
    gallery: [asset(file)],
    summary,
    description: description || meta.description,
    deliverables: deliverables || meta.deliverables,
    suitable: suitable || meta.suitable,
  };
}

const workDefinitions = [
  {
    id: "burger-emblem",
    title: "铁堡鼓鼓",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173502_1262_72.png",
    width: 911,
    height: 1240,
    summary: "黑底金色的标识图形，适合作为品牌主视觉封面。",
    description:
      "这张图适合放在品牌类作品列表里，用来说明你能做高识别度的标识和强风格图形。",
    deliverables: ["标识图形", "品牌封面", "视觉主画面"],
    suitable: ["品牌主视觉", "黑金风格图形", "强识别封面"],
  },
  {
    id: "deep-sea-poster",
    title: "深海遗产",
    category: "海报视觉",
    creatorId: "poster",
    file: "裁黑边/海报/微信图片_20260518171734_1246_72.jpg",
    width: 1440,
    height: 2010,
    summary: "高饱和蓝黄撞色的展陈海报，排版和主体画面都很强。",
    description:
      "这张图更像完整的主题海报实验，视觉重心很明确，适合在首页精选项目里承担第一眼抓人的作用。",
  },
  {
    id: "street-ip-trio",
    title: "街头角色设定",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173131_1249_72.jpg",
    width: 1440,
    height: 1944,
    summary: "潮玩角色和服装语言比较完整，适合做品牌人物化表达。",
    description:
      "这张适合放在首页精选项目里，它能说明你不只是做单张图，也能做完整的角色形象和品牌气质。",
  },
  {
    id: "poster-01",
    title: "海报练习一",
    category: "海报视觉",
    creatorId: "poster",
    file: "裁黑边/海报/微信图片_20260518171728_1243_72.jpg",
    width: 1242,
    height: 1660,
    summary: "偏图文构成的主题海报，适合展示排版和配色控制。",
  },
  {
    id: "poster-02",
    title: "海报练习二",
    category: "海报视觉",
    creatorId: "poster",
    file: "裁黑边/海报/微信图片_20260518171729_1244_72.jpg",
    width: 1242,
    height: 1660,
    summary: "黑橙对比强烈的人物海报，适合作为情绪型主视觉样本。",
  },
  {
    id: "poster-03",
    title: "红黑跃窗",
    category: "海报视觉",
    creatorId: "poster",
    file: "裁黑边/海报/微信图片_20260518171731_1245_72.jpg",
    width: 1242,
    height: 1660,
    summary: "红黑强对比的人物跃窗海报，适合承担首页主图窗口。",
    description:
      "这张图更适合作为首页右侧主图窗口，它的红黑冲击力强，和整体黑底页面也很合拍。",
    deliverables: ["主海报", "人物构图", "情绪型主视觉"],
    suitable: ["主视觉封面", "人物海报", "强冲击画面"],
  },
  {
    id: "white-peacock-poster",
    title: "白孔雀未启之屏",
    category: "海报视觉",
    creatorId: "poster",
    file: "裁黑边/海报/微信图片_20260518171739_1247_72.jpg",
    width: 1440,
    height: 2010,
    summary: "以白孔雀为主体的大字海报，画面辨识度很高。",
  },
  {
    id: "poster-04",
    title: "海报练习四",
    category: "海报视觉",
    creatorId: "poster",
    file: "裁黑边/海报/微信图片_20260518171741_1248_72.jpg",
    width: 1080,
    height: 1440,
    summary: "更偏封面气质的单张海报，适合竖向浏览场景。",
  },
  {
    id: "street-ip-01",
    title: "角色设定一",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173135_1250_72.jpg",
    width: 1440,
    height: 1324,
    summary: "偏街头风格的角色展示，适合作为人物化品牌样本。",
  },
  {
    id: "street-ip-02",
    title: "角色设定二",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173137_1251_72.jpg",
    width: 1440,
    height: 1944,
    summary: "单角色主视觉图，适合做系列人物单张展示。",
  },
  {
    id: "street-ip-03",
    title: "角色设定三",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173139_1252_72.jpg",
    width: 1440,
    height: 1944,
    summary: "同系列角色单图，适合补足人物延展能力。",
  },
  {
    id: "pupugo-board",
    title: "宠物品牌设定板",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173141_1253_72.jpg",
    width: 1440,
    height: 1924,
    summary: "偏完整风格板的品牌设定页，适合说明品牌语言。",
  },
  {
    id: "pupugo-application",
    title: "宠物品牌应用图",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173143_1254_72.jpg",
    width: 1440,
    height: 1924,
    summary: "偏落地展示的应用图，适合说明品牌不是停留在概念层。",
  },
  {
    id: "graphic-sticker-set",
    title: "图形贴纸合集",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173146_1255_72.jpg",
    width: 1117,
    height: 1719,
    summary: "多组贴纸、徽章和表情图形的风格合集，适合做周边和延展。",
  },
  {
    id: "exhibition-visual-system",
    title: "展馆视觉系统",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173454_1260_72.png",
    width: 1536,
    height: 1024,
    summary: "偏完整提案版式的视觉系统展示，适合说明整套品牌思路。",
  },
  {
    id: "tea-brand-materials",
    title: "南洋手作物料",
    category: "品牌IP",
    creatorId: "brand-ip",
    file: "裁黑边/品牌ip/微信图片_20260518173456_1261_72.jpg",
    width: 655,
    height: 1199,
    summary: "一组偏餐饮品牌落地物料的展示图，适合说明应用能力。",
  },
  {
    id: "toy-character-model",
    title: "气球角色建模",
    category: "三维建模",
    creatorId: "model",
    file: "裁黑边/3d建模/微信图片_20260518173432_1256_72.jpg",
    width: 1284,
    height: 1706,
    summary: "偏潮玩方向的角色建模记录，适合展示白模和配色能力。",
  },
  {
    id: "dragon-model",
    title: "白龙模型",
    category: "三维建模",
    creatorId: "model",
    file: "裁黑边/3d建模/微信图片_20260518173441_1257_72.png",
    width: 960,
    height: 1183,
    summary: "白模状态下的龙形雕塑，适合展示结构和体量关系。",
  },
  {
    id: "mask-model",
    title: "金属面具角色",
    category: "三维建模",
    creatorId: "model",
    file: "裁黑边/3d建模/微信图片_20260518173446_1258_72.png",
    width: 960,
    height: 1199,
    summary: "偏未来感和材质表达的角色渲染，适合做视觉钉子。",
  },
  {
    id: "stage-space",
    title: "舞台空间方案",
    category: "三维建模",
    creatorId: "model",
    file: "裁黑边/3d建模/微信图片_20260518173448_1259_72.png",
    width: 960,
    height: 924,
    summary: "活动或秀场方向的空间方案图，适合展示三维场景能力。",
  },
  {
    id: "realistic-head-01",
    title: "写实头雕一",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171657_1_1210.jpg",
    width: 2415,
    height: 3220,
    summary: "偏写实方向的人像头雕，适合展示细节刻画和上色控制。",
  },
  {
    id: "realistic-head-02",
    title: "写实头雕二",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171659_2_1210.jpg",
    width: 2172,
    height: 2897,
    summary: "延续写实头雕方向，适合作为局部刻画和色彩控制补充。",
  },
  {
    id: "realistic-head-03",
    title: "写实头雕三",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171700_3_1210.jpg",
    width: 4096,
    height: 3072,
    summary: "偏横向拍摄的头雕过程图，适合作为工作状态展示。",
  },
  {
    id: "realistic-head-04",
    title: "写实头雕四",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171702_4_1210.jpg",
    width: 3072,
    height: 4096,
    summary: "偏竖向细节展示，适合补充头雕角度和表面处理。",
  },
  {
    id: "realistic-head-05",
    title: "写实头雕五",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171704_5_1210.jpg",
    width: 3072,
    height: 4096,
    summary: "偏近景刻画的头雕练习，适合展示细部处理。",
  },
  {
    id: "bust-01",
    title: "角色胸像一",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171707_6_1210.jpg",
    width: 4032,
    height: 3024,
    summary: "角色胸像方向的过程记录，适合展示塑形阶段。",
  },
  {
    id: "bust-02",
    title: "角色胸像二",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171708_7_1210.jpg",
    width: 1076,
    height: 1435,
    summary: "胸像局部图，适合作为上色前后的补充。",
  },
  {
    id: "bust-03",
    title: "角色胸像三",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171709_8_1210.jpg",
    width: 2160,
    height: 3840,
    summary: "非常适合移动端查看的竖向胸像图。",
  },
  {
    id: "bust-04",
    title: "角色胸像四",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171712_9_1210.jpg",
    width: 2005,
    height: 3106,
    summary: "偏近距离的人物气质展示，适合收藏向项目说明。",
  },
  {
    id: "bust-05",
    title: "角色胸像五",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171714_10_1210.jpg",
    width: 1178,
    height: 1767,
    summary: "竖向单头展示，适合补足不同角度的观看体验。",
  },
  {
    id: "bust-06",
    title: "角色胸像六",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171715_11_1210.jpg",
    width: 1163,
    height: 1744,
    summary: "偏稳的正面视角，适合展示脸部比例和上色。",
  },
  {
    id: "bust-07",
    title: "角色胸像七",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171716_12_1210.jpg",
    width: 1100,
    height: 1650,
    summary: "近景头像展示，适合作为胸像方向的补充卡片。",
  },
  {
    id: "bust-08",
    title: "角色胸像八",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171717_13_1210.jpg",
    width: 1340,
    height: 1787,
    summary: "偏过渡视角的头像图，适合补足角度完整度。",
  },
  {
    id: "bust-09",
    title: "角色胸像九",
    category: "头雕",
    creatorId: "sculpt",
    file: "裁黑边/头雕/微信图片_20260518171721_14_1210.jpg",
    width: 2253,
    height: 3004,
    summary: "胸像气质和漫画化处理更明显，适合收藏向展示。",
  },
];

const works = workDefinitions.map((definition) => makeWork(definition));
const categories = ["全部", ...new Set(works.map((item) => item.category))];
const detailPanel = document.querySelector("#detailPanel");
const detailContent = document.querySelector("#detailContent");

function getCreatorById(id) {
  return creators.find((item) => item.id === id);
}

function getWorkById(id) {
  return works.find((item) => item.id === id);
}

function pill(text) {
  return `<span class="pill">${text}</span>`;
}

function tag(text) {
  return `<span class="detail-tag">${text}</span>`;
}

function renderHeroFeature() {
  const featured = getWorkById(heroWorkId);
  if (!featured) return;

  document.querySelector("#heroFeature").innerHTML = `
    <div class="stage-topbar">
      <nav>
        <span>首页</span>
        <span>作品</span>
        <span>归档</span>
      </nav>
      <span class="pill">点击查看项目</span>
    </div>
    <div class="stage-body">
      <div class="stage-stack">
        ${featured.deliverables.map(pill).join("")}
      </div>
      <div class="stage-title">${featured.title}</div>
      <div class="stage-cover">
        <img src="${featured.cover}" alt="${featured.title}" />
      </div>
    </div>
  `;
}

function renderFeatured() {
  const featured = featuredWorkIds
    .map((id) => getWorkById(id))
    .filter(Boolean)
    .map((work) => {
      const creator = getCreatorById(work.creatorId);
      return `
        <article class="featured-card">
          <button type="button" data-work-id="${work.id}">
            <div class="card-cover">
              <img src="${work.cover}" alt="${work.title}" loading="lazy" />
            </div>
            <div class="card-meta">
              <h3>${work.title}</h3>
              <div class="meta-line">
                <span>${work.category} / ${creator.name}</span>
                <span>${work.year}</span>
              </div>
            </div>
          </button>
        </article>
      `;
    })
    .join("");

  document.querySelector("#featuredGrid").innerHTML = featured;
}

function renderFilters(active = "全部") {
  document.querySelector("#filterRow").innerHTML = categories
    .map(
      (category) => `
        <button
          class="filter-button ${category === active ? "is-active" : ""}"
          type="button"
          data-filter="${category}"
        >
          ${category}
        </button>
      `,
    )
    .join("");
}

function renderWorks(active = "全部") {
  const filtered =
    active === "全部" ? works : works.filter((item) => item.category === active);

  document.querySelector("#worksGrid").innerHTML = filtered
    .map((work) => {
      const creator = getCreatorById(work.creatorId);
      return `
        <article class="work-card" data-size="${work.size}">
          <button type="button" data-work-id="${work.id}">
            <div class="work-thumb" style="--card-ratio:${work.ratio}">
              <img src="${work.cover}" alt="${work.title}" loading="lazy" />
            </div>
            <div class="work-meta">
              <h3>${work.title}</h3>
              <div class="work-subline">
                <span>${work.category}</span>
                <span>${work.year}</span>
              </div>
              <div class="work-subline">
                <span>${creator.name}</span>
                <span>${work.summary}</span>
              </div>
            </div>
          </button>
        </article>
      `;
    })
    .join("");
}

function renderCreators() {
  document.querySelector("#creatorsGrid").innerHTML = creators
    .map((creator) => {
      const workCount = works.filter((work) => work.creatorId === creator.id).length;
      return `
        <article class="creator-card">
          <div class="creator-avatar">
            <div class="avatar-ring">${creator.initials}</div>
          </div>
          <button type="button" data-creator-id="${creator.id}">
            <div class="creator-meta">
              <h3>${creator.name}</h3>
              <div class="meta-line">
                <span>${creator.role}</span>
                <span>${workCount} 个项目</span>
              </div>
              <div class="creator-stats">
                ${pill(creator.availability)}
                ${pill(creator.price)}
                ${pill(creator.cycle)}
              </div>
              <p class="creator-copy">${creator.bio}</p>
              <div class="creator-services">
                ${creator.services.map(pill).join("")}
              </div>
            </div>
          </button>
        </article>
      `;
    })
    .join("");
}

function getRelatedWorks(work) {
  const sameCreator = works.filter(
    (item) => item.id !== work.id && item.creatorId === work.creatorId,
  );
  const sameCategory = works.filter(
    (item) =>
      item.id !== work.id &&
      item.category === work.category &&
      item.creatorId !== work.creatorId,
  );

  return [...sameCreator, ...sameCategory].slice(0, 4);
}

function renderRelatedCards(items) {
  return items
    .map(
      (work) => `
        <article class="related-card">
          <button type="button" data-work-id="${work.id}">
            <div class="related-cover">
              <img src="${work.cover}" alt="${work.title}" loading="lazy" />
            </div>
            <div class="related-meta">
              <strong>${work.title}</strong>
              <span>${work.category}</span>
            </div>
          </button>
        </article>
      `,
    )
    .join("");
}

function openPanel(html) {
  detailContent.innerHTML = html;
  detailPanel.classList.add("is-open");
  detailPanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePanel() {
  detailPanel.classList.remove("is-open");
  detailPanel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openWorkDetail(workId) {
  const work = getWorkById(workId);
  const creator = getCreatorById(work.creatorId);
  const related = getRelatedWorks(work);

  if (!work || !creator) return;

  openPanel(`
    <div class="detail-hero">
      <img src="${work.cover}" alt="${work.title}" />
    </div>
    <div class="detail-header">
      <div class="detail-subline">${work.category} / ${creator.name} / ${work.year}</div>
      <h2>${work.title}</h2>
      <p class="detail-copy">${work.description}</p>
    </div>
    <section class="detail-section">
      <h3>项目范围</h3>
      <div class="detail-tags">
        ${work.deliverables.map(tag).join("")}
      </div>
    </section>
    <section class="detail-section">
      <h3>适合合作方向</h3>
      <div class="detail-tags">
        ${work.suitable.map(tag).join("")}
      </div>
    </section>
    <section class="detail-section">
      <h3>作者</h3>
      <div class="detail-author-card">
        <div class="detail-author-avatar">${creator.initials}</div>
        <div class="detail-author-text">
          <h3>${creator.name}</h3>
          <div class="detail-author-meta">${creator.role} / ${creator.city}</div>
          <p>${creator.bio}</p>
          <div class="detail-author-actions">
            <button class="detail-action" type="button" data-creator-id="${creator.id}">查看作者</button>
            <span class="detail-tag">${creator.availability}</span>
            <span class="detail-tag">${creator.price}</span>
            <span class="detail-tag">${creator.cycle}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>相关作品</h3>
      <div class="related-grid">
        ${renderRelatedCards(related)}
      </div>
    </section>
  `);
}

function openCreatorDetail(creatorId) {
  const creator = getCreatorById(creatorId);
  const creatorWorks = works.filter((item) => item.creatorId === creatorId);

  if (!creator) return;

  openPanel(`
    <div class="detail-header">
      <div class="detail-subline">${creator.role} / ${creator.city}</div>
      <h2>${creator.name}</h2>
      <p class="detail-copy">${creator.bio}</p>
    </div>
    <section class="detail-section">
      <h3>合作信息</h3>
      <div class="detail-stats">
        <div class="detail-stat">
          <span>接单状态</span>
          <strong>${creator.availability}</strong>
        </div>
        <div class="detail-stat">
          <span>价格区间</span>
          <strong>${creator.price}</strong>
        </div>
        <div class="detail-stat">
          <span>交付周期</span>
          <strong>${creator.cycle}</strong>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>擅长方向</h3>
      <div class="detail-tags">
        ${creator.services.map(tag).join("")}
      </div>
    </section>
    <section class="detail-section">
      <h3>代表作品</h3>
      <div class="related-grid">
        ${renderRelatedCards(creatorWorks)}
      </div>
    </section>
  `);
}

function handleClick(event) {
  const workButton = event.target.closest("[data-work-id]");
  const creatorButton = event.target.closest("[data-creator-id]");
  const filterButton = event.target.closest("[data-filter]");
  const closeTrigger = event.target.closest("[data-close-panel]");
  const inquiryTrigger = event.target.closest("[data-open-inquiry]");

  if (filterButton) {
    const category = filterButton.dataset.filter;
    renderFilters(category);
    renderWorks(category);
    return;
  }

  if (workButton) {
    openWorkDetail(workButton.dataset.workId);
    return;
  }

  if (creatorButton) {
    openCreatorDetail(creatorButton.dataset.creatorId);
    return;
  }

  if (closeTrigger) {
    closePanel();
    return;
  }

  if (inquiryTrigger) {
    closePanel();
    document.querySelector("#inquiry").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.addEventListener("click", handleClick);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanel();
});

renderHeroFeature();
renderFeatured();
renderFilters();
renderWorks();
renderCreators();
