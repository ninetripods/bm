// Bilingual content for Bloommama Postpartum Care
// Default language: English. Toggle: 中文

export const SERVICES = [
  {
    id: "milk-in",
    icon: "Sparkles",
    en: {
      name: "Postpartum Lactation Support",
      tagline: "Days 1–3 · The Golden Window",
      desc: "Supportive sessions during the early postpartum days. Utilizing gentle traditional Chinese meridian relaxation and soft pressure-point techniques to ease localized muscle tension, support initial colostrum flow, and promote physical comfort as you begin nursing.",
    },
    cn: {
      name: "产后科学开奶",
      tagline: "黄金期 1–3 天 · 上门服务",
      desc: "产后黄金期专业上门服务。通过传统中式经络舒缓与特定部位的温和点按，协助放松胸部周围紧绷的肌肉，促进局部气血循环，从而引导初乳顺利分泌，为您建立舒适、轻松的母乳喂养良好开端。",
    },
    single: 200,
    package: 500,
  },
  {
    id: "boosting",
    icon: "Droplets",
    en: {
      name: "Breastfeeding Flow & Supply Support",
      tagline: "For Low or Inconsistent Supply",
      desc: "Manual relaxation care incorporating traditional meridian principles and targeted pressure-point conditioning. Designed to reduce deep tissue tension and improve localized circulation, safely supporting a comfortable and natural breastfeeding supply.",
    },
    cn: {
      name: "舒适催乳追奶",
      tagline: "奶量不足 · 气奶 · 追奶",
      desc: "针对哺乳期奶量不足、气奶或希望全母乳喂养的妈妈。我们顺应中式传统经络，针对局部特定位置进行纯手法揉捏与筋膜放松。在协助舒缓妈妈产后情绪与压力的同时，科学促进乳汁的自然与稳定分泌。",
    },
    single: 200,
    package: 500,
  },
  {
    id: "blocked-duct",
    icon: "Waves",
    en: {
      name: "Breast Tightness & Comfort Relief",
      tagline: "Engorgement · Lumps · Tightness",
      desc: "Immediate, device-free relief for physical tightness, localized lumps, and breast engorgement during lactation. Our service combines traditional Chinese manual techniques with gentle, localized pressure-point soothing to ease tissue fullness and promote deep relaxation.",
    },
    cn: {
      name: "温和手法通乳",
      tagline: "涨奶 · 堵塞 · 硬块",
      desc: "专注缓解产后生理性涨奶、乳腺管堵塞、气奶及局部硬块淤积。结合中式传统推拿技巧，顺应局部经络走向对紧绷点进行温柔的点按与舒缓。本项服务为 100% 纯手法操作，绝不使用任何通电或侵入性医疗仪器，温和化解积乳紧绷感。",
    },
    single: 220,
    package: 550,
  },
  {
    id: "weaning",
    icon: "Leaf",
    en: {
      name: "Gentle Weaning & Comfort Care",
      tagline: "Gentle Transition · Comfort First",
      desc: "Scheduled manual expression and comforting care aligned with traditional meridian touch principles. Designed to provide deep relaxation and ease physical tightness, our approach gently supports your body as it transitions through the weaning process and naturally adjusts its milk supply.",
    },
    cn: {
      name: "科学断奶回奶",
      tagline: "舒适过渡 · 减轻胀痛",
      desc: "在妈妈决定断奶的特殊过渡时期，配合中式传统经络抚触与特定位置的压力舒缓，提供阶段性的乳房手法排空调理。协助身体平稳、舒适地完成自然回奶过程，有效减轻断奶期间的积乳胀痛。",
    },
    single: 180,
    package: 450,
    packageNoteEn: "Includes residual milk clearing",
    packageNoteCn: "含排残奶",
  },
  {
    id: "residual",
    icon: "Flower",
    en: {
      name: "Post-Nursing Comfort & Care",
      tagline: "Long-term Breast Wellbeing",
      desc: "After lactation or weaning has fully ended, we provide professional, purely manual soothing care for the breast ducts. Residual milk matrix lingering inside the ducts is gently soothed away, keeping the breasts feeling fresh and clean day to day, and easing the localized lumps and tightness that accumulated residue can cause later. For mothers who stopped nursing many years ago and have never received post-lactation soothing care, we offer the same deep comforting relief and routine maintenance — helping the breasts return to a lighter, softer state of wellbeing.",
    },
    cn: {
      name: "后期排残奶汁",
      tagline: "乳腺健康 · 长期养护",
      desc: "在哺乳期或回奶彻底结束后，提供专业的乳腺管纯手法清洁与养护。温柔清理乳腺管内残留的浓稠残汁，保持胸部的日常清爽与洁净，预防积乳淤积带来的后期局部硬块与紧绷感。针对停止哺乳多年、从未做过后期排残的妈妈，我们同样提供深层的舒适舒缓与日常净化保养，帮助乳房恢复轻松、柔软的健康。",
    },
    single: 180,
    package: null,
  },
];

export const GRAND_PACKAGE = {
  price: 1800,
  en: {
    name: "Complete Postpartum Wellness Plan",
    desc: "Milk-In · Supply · Blocked Duct · Weaning (incl. residual clearing) — 3 sessions each, covering the full postpartum journey.",
    items: ["Milk-In × 3", "Supply × 3", "Blocked Duct × 3", "Weaning × 3 (incl. residual)"],
  },
  cn: {
    name: "全程调理大套餐",
    desc: "开奶 · 催奶 · 通乳 · 回奶（含排残奶） — 每项 3 次基础调理，覆盖整个产后旅程。",
    items: ["开奶 × 3", "催奶 × 3", "通乳 × 3", "回奶 × 3（含排残奶）"],
  },
};

export const BENEFITS = [
  {
    icon: "Target",
    en: {
      title: "Gentle Comfort, Relaxing Tender Spots",
      desc: "We focus on gentle, touch-based relaxation techniques around the breast area. Our approach is designed to help you feel more comfortable and at ease, avoiding any unnecessary physical pressure.",
    },
    cn: {
      title: "精准圈开紧绷硬块 · 温柔无痛",
      desc: "顺应中式传统经络走向，精准定位乳房外周紧绷点进行点按。凭借双手的巧劲与柔和渗透力，由表及里温和化解积乳紧绷感。真正做到不伤乳腺，在低痛感中帮您散开硬块。",
    },
  },
  {
    icon: "HeartPulse",
    en: {
      title: "Promoting Relaxation, Supporting Natural Body Harmony",
      desc: "By gently soothing specific traditional meridian reflex points, we help you relax and settle into a peaceful state, which supports your overall wellbeing.",
    },
    cn: {
      title: "激发气血循环 · 科学促进泌乳",
      desc: "产后下奶慢或奶量不足往往源于局部紧绷、循环不畅。通过对传统经络特定反射位置的推拿与柔和舒缓，放松乳腺周围筋膜，协助身体建立轻松的哺乳状态。",
    },
  },
  {
    icon: "Wind",
    en: {
      title: "Soothing Support for Breast Fullness",
      desc: "When you feel heavy or sensitive, our gentle comfort-focused sessions are designed to help you feel more relaxed and promote a sense of relief and physical ease.",
    },
    cn: {
      title: "减轻生理性涨奶 · 快速消肿舒缓",
      desc: "产后初期遭遇生理性涨奶时，乳房紧绷发硬。通过外围特定经络路径的手法舒缓，像疏通引流一般快速带走沉重压迫感，让乳房迅速恢复柔软与舒适。",
    },
  },
  {
    icon: "Sprout",
    en: {
      title: "Promoting Wellbeing & Tissue Comfort",
      desc: "Mindful touch helps ease tension and supports your physical comfort. We provide dedicated care to help you feel refreshed and relaxed, focusing on your overall long-term breast tissue comfort.",
    },
    cn: {
      title: "调理身心压力 · 预防后期硬块",
      desc: "哺乳期情绪波动易引发紧绷与堵塞。中式传统经络抚触在日常调理的同时，舒缓胸口周围因焦虑产生的紧张感，并做好后期排残汁清理，保持乳腺管的日常清洁。",
    },
  },
];

export const WHY = [
  {
    en: {
      title: "When discomfort is left unaddressed",
      desc: "Unresolved physical tightness can persist, potentially leading to ongoing tenderness. Addressing these feelings early helps you maintain greater comfort and ease during your daily routine.",
    },
    cn: {
      title: "涨奶未及时处理",
      desc: "可能恶化为疼痛性堵塞、奶流受阻，若拖延则进一步加剧局部胀痛与极度紧绷不适。",
    },
  },
  {
    en: {
      title: "The benefit of gentle, mindful care",
      desc: "We advocate for techniques that respect your body's natural rhythm. Avoiding harsh pressure helps protect delicate tissue, ensuring you remain comfortable throughout your transition.",
    },
    cn: {
      title: "粗暴揉搓损伤乳腺",
      desc: "盲目大面积用力的普通按摩，极易导致娇嫩的乳腺组织受损、水肿，显著增加后续的舒缓难度与身体负担。",
    },
  },
  {
    en: {
      title: "Support for your post-nursing journey",
      desc: "After nursing concludes, your body continues to adjust. Gentle, supportive care can help ease the transition, ensuring you feel comfortable, refreshed, and well-cared for as you move into this new stage.",
    },
    cn: {
      title: "断奶后残奶滞留",
      desc: "若未彻底排残，残留乳汁可能形成长期局部硬块淤积，影响停止哺乳后的乳房日常轻松与洁净养护。",
    },
  },
];

export const UI = {
  en: {
    brand: "Bloommama",
    tagline: "Postpartum Support Services · 女性产后支持",
    nav: {
      home: "Home",
      services: "Services",
      philosophy: "Philosophy",
      pricing: "Pricing",
      booking: "Book",
      contact: "Contact",
      admin: "Admin",
    },
    hero: {
      eyebrow: "In-home postpartum care · Perth",
      h1Top: "Tender care",
      h1Mid: "for the early days of",
      h1Bot: "motherhood",
      sub: "Supportive, device-free, painless lactation guidance in the comfort of your home. We blend traditional Chinese meridian touch with modern postpartum support services — gently supporting you through milk-in, supply, blocked ducts, weaning, and beyond.",
      ctaBook: "Book a home visit",
      ctaServices: "Explore services",
      badge1: "100% manual",
      badge2: "No devices",
      badge3: "Perth & surrounds",
      perSession: "per session",
    },
    sections: {
      servicesEyebrow: "Our Care",
      servicesTitle: "Five gentle services for every stage",
      servicesSub: "Each session lasts 50–90 minutes and is delivered in your home. The recommended 3-session plan is the baseline — some bodies may benefit from additional sessions.",
      whyEyebrow: "Why it matters",
      whyTitle: "Why prioritising your comfort matters",
      whySub: "Postpartum breast tissue is exceptionally delicate. Understanding how to gently care for your body is an essential part of your recovery journey.",
      benefitsEyebrow: "Our Approach",
      benefitsTitle: "Four reasons mothers trust meridian-aligned touch",
      promiseEyebrow: "Our Promise",
      promiseTitle: "1-on-1 personal support, from your first visit to long after",
      promiseDesc: "Every mother is paired with one dedicated support person who walks alongside you throughout your postpartum journey. We are here to answer questions between sessions, ensuring our care remains focused on your comfort. You are never just a booking; you are someone we prioritize and support as you navigate this new stage.",
      promiseBullets: [
        "One dedicated support person — consistency you can count on",
        "Supportive check-ins between sessions, whenever you need a listening ear",
        "Service approach adapted based on your evolving comfort needs",
      ],
      pricingEyebrow: "Pricing",
      pricingTitle: "Honest, transparent rates",
      pricingSub: "Each session lasts 50–90 minutes. The 3-session plan is the baseline; we adjust to your body's response.",
      pricingNote: "All prices in AUD. Late-night or urgent on-call visits may carry an additional fee.",
      grandTitle: "The Complete Journey",
      single: "Single session",
      package: "3-session plan",
      includesResidual: "Includes residual milk clearing",
      bookThis: "Book this",
      bookTitle: "Book your home visit",
      bookSub: "Tell us a little about you and we'll be in touch within 24 hours to confirm timing.",
      contactTitle: "Get in touch",
      contactSub: "Phone, WeChat or email — whichever feels easiest.",
    },
    booking: {
      name: "Your name",
      phone: "Phone number",
      email: "Email (optional)",
      wechat: "WeChat ID (optional)",
      service: "Service of interest",
      package: "Plan",
      packageSingle: "Single session",
      packagePackage: "3-session plan",
      packageGrand: "Complete journey · Milk-In · Supply · Blocked Duct · Weaning (incl. residual)",
      date: "Preferred date",
      time: "Preferred time",
      suburb: "Your suburb (Perth area)",
      stage: "Postpartum stage",
      stagePlaceholder: "e.g. Day 2, 3 weeks postpartum, weaning week 1...",
      notes: "Anything else we should know?",
      submit: "Send booking request",
      submitting: "Sending...",
      successTitle: "Booking received",
      successDesc: "Thank you — we'll contact you within 24 hours to confirm.",
      newBooking: "Send another",
    },
    disclaimer: {
      title: "Important — Please read",
      body: "All services, descriptions, and information on this website are intended solely for general relaxation, traditional Chinese wellness massage, meridian touch, and peer-to-peer experiential breastfeeding support. We do not provide any form of medical advice, clinical diagnosis, or medical treatment. We are not registered medical practitioners, midwives, or clinical lactation consultants (IBCLC). We do not perform clinical acupuncture, prescribe Chinese herbal medicine, or treat medical conditions such as acute mastitis or breast infections. Our services are strictly non-therapeutic, non-clinical, and non-invasive. If you are experiencing a medical emergency, signs of systemic infection, high fever (above 38.5°C), or severe localized inflammation, you must immediately seek advice from a registered General Practitioner (GP) or visit a hospital.",
    },
    footer: {
      area: "Service area",
      areaValue: "Perth & surrounding suburbs, Western Australia",
      hours: "Most days · by appointment",
      copyright: "Bloommama Postpartum Support Services · All rights reserved",
    },
  },
  cn: {
    brand: "Bloommama",
    tagline: "Postpartum Care · 女性产后支持",
    nav: {
      home: "首页",
      services: "服务项目",
      philosophy: "理念",
      pricing: "价格",
      booking: "预约",
      contact: "联系",
      admin: "后台",
    },
    hero: {
      eyebrow: "上门产后调理 · 珀斯地区",
      h1Top: "温柔守护",
      h1Mid: "您的产后",
      h1Bot: "初为人母的日子",
      sub: "在家中即可享受专业、无仪器、低痛感的产后乳房调理。我们将中式传统经络手法与现代产后调理相结合，温柔陪伴您度过开奶、追奶、通乳、回奶到排残奶的每一段旅程。",
      ctaBook: "预约上门服务",
      ctaServices: "了解服务",
      badge1: "100% 纯手法",
      badge2: "不使用任何仪器",
      badge3: "珀斯及周边",
      perSession: "每次调理",
    },
    sections: {
      servicesEyebrow: "服务项目",
      servicesTitle: "覆盖产后每个阶段的五项温柔调理",
      servicesSub: "每次调理时长约 50–90 分钟，上门服务。推荐 3 次为基础调理次数，会根据个人体质相应增加。",
      whyEyebrow: "重要性",
      whyTitle: "如果错过了这些关键时刻，会发生什么？",
      whySub: "产后乳房组织极度娇嫩。知道「不应该做什么」与知道「应该做什么」同样重要。",
      benefitsEyebrow: "核心调理优势",
      benefitsTitle: "妈妈们信任经络手法的四大理由",
      promiseEyebrow: "我们的承诺",
      promiseTitle: "一对一跟踪服务 · 让产后妈妈更安心",
      promiseDesc: "每一位妈妈都由一位专属调理师全程跟进 — 在上门之间随时解答您的疑问，根据您身体的实际反应调整方案，并在调理结束后依然陪伴您。您不是一次预约，而是一段被认真陪伴的旅程。",
      promiseBullets: [
        "一对一专属调理师 · 不轮换",
        "每次调理之间随时跟进解答",
        "依您身体反应实时调整方案",
      ],
      pricingEyebrow: "价格",
      pricingTitle: "透明真诚的价格",
      pricingSub: "每次调理时长约 50–90 分钟。推荐 3 次为基础调理次数，我们会根据您的身体反应调整。",
      pricingNote: "价格均为澳币 (AUD)。夜间或紧急加急上门服务费用可能相应增加。",
      grandTitle: "全程旅程套餐",
      single: "单次调理",
      package: "3 次套餐",
      includesResidual: "含排残奶",
      bookThis: "立即预约",
      bookTitle: "预约您的上门服务",
      bookSub: "告诉我们一些信息，我们会在 24 小时内联系您确认时间。",
      contactTitle: "联系我们",
      contactSub: "电话、微信或邮箱 — 哪种方式都可以。",
    },
    booking: {
      name: "您的姓名",
      phone: "联系电话",
      email: "邮箱（可选）",
      wechat: "微信号（可选）",
      service: "感兴趣的服务",
      package: "套餐选择",
      packageSingle: "单次调理",
      packagePackage: "3 次套餐",
      packageGrand: "全程套餐 · 开奶·催奶·通乳·回奶（含排残奶）",
      date: "希望预约日期",
      time: "希望预约时段",
      suburb: "您所在的社区（珀斯地区）",
      stage: "产后阶段",
      stagePlaceholder: "例如：产后第 2 天 / 产后 3 周 / 断奶第 1 周……",
      notes: "其他想告诉我们的信息？",
      submit: "提交预约",
      submitting: "提交中……",
      successTitle: "预约已收到",
      successDesc: "感谢您 — 我们会在 24 小时内与您联系确认。",
      newBooking: "再次预约",
    },
    disclaimer: {
      title: "重要说明 — 请仔细阅读",
      body: "本网站所提供的所有服务、描述与信息，仅用于一般放松调理、中式传统养生按摩、经络抚触及非临床的母乳喂养经验分享。我们不提供任何形式的医疗建议、临床诊断或医疗治疗。我们并非注册医生、助产士或临床认证的母乳指导（IBCLC）。我们不进行临床针灸、不开具中药处方、不治疗如急性乳腺炎或乳腺感染等医疗状况。本服务为完全非治疗性、非临床、非侵入性。如您出现医疗紧急状况、全身性感染迹象、高烧（超过 38.5°C）或严重局部炎症，请立即向注册全科医生（GP）就诊或前往医院。",
    },
    footer: {
      area: "服务区域",
      areaValue: "西澳大利亚 · 珀斯及周边社区",
      hours: "全周大部分时间 · 预约制",
      copyright: "Bloommama 产后调理 · 版权所有",
    },
  },
};

export const CONTACT = {
  phone: "0451 960 316",
  phoneRaw: "0451960316",
  email: "bloommama66@gmail.com",
  wechatQrUrl:
    "https://customer-assets.emergentagent.com/job_904b013b-3e2d-4320-bc50-c7cafbaea259/artifacts/et8lxo3t_Weixin1.jpg",
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1552819289-e14fbbcea868?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxtb3RoZXIlMjBuZXdib3JuJTIwZ2VudGxlfGVufDB8fHx8MTc4MDc1ODE3Mnww&ixlib=rb-4.1.0&q=85",
  serviceCare:
    "https://images.unsplash.com/photo-1582486225644-aeacf6aa0b1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBuZXdib3JuJTIwZ2VudGxlfGVufDB8fHx8MTc4MDc1ODE3Mnww&ixlib=rb-4.1.0&q=85",
  wellness:
    "https://images.unsplash.com/photo-1765490526583-4bf7f007096f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHw0fHxjYWxtJTIwd2VsbG5lc3MlMjBuYXR1cmFsfGVufDB8fHx8MTc4MDc1ODE3Mnww&ixlib=rb-4.1.0&q=85",
  motherBaby:
    "https://images.unsplash.com/photo-1542385151-efd9000785a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwzfHxtb3RoZXIlMjBuZXdib3JuJTIwZ2VudGxlfGVufDB8fHx8MTc4MDc1ODE3Mnww&ixlib=rb-4.1.0&q=85",
};
