import type { NationData } from "./types";

export const zuluData: NationData = {
  id: "zulu",
  nationName: "Zulu (AmaZulu)",
  theme: {
    primary: "bg-clay",
    headerBg: "bg-paper",
    accent: "text-clay",
    border: "border-clay",
    ring: "ring-clay/20",
    button: "bg-clay hover:bg-clay-dark text-paper",
    iconColor: "#A2431F", // Clay
    beads: ["#231A14", "#B3341F", "#FBF6EC", "#2A5C8F"],
  },
  steps: [
    {
      id: "sending_of_the_letter",
      title: "Sending of the Letter",
      zuluTitle: "Incwadi Yokucela Usuku",
      summary:
        "The young man sends a letter from his home to the young woman's home. " +
        "In it, his family asks to come on a chosen day to ask for a new kinship.",
      description:
        "Insizwa ithumela incwadi esuka kubo kwayo ihambise kubo kwentombi, leyoncwadi iqukethe isicelo sokuba umndeni wakubo kwensizwa uyafisa ukuza uzocela isihlobo esisha.",
      details: [
        "Incwadi iqukethe isicelo sokuba umndeni wakubo kwensizwa uyafisa ngosuku oluthile ukuza uzocela isihlobo esisha kulowomuzi wakubo kwentombi.",
        "Uma bevuma kubo kwentombi, kuba yilo usuku lolo lokuvakasha.",
      ],
      // isiZulu caption to come from the cultural owner
      media: {
        kind: "illustration",
        src: "/scenes/sending-the-letter.svg",
        alt: "A messenger walks along the path from the groom's home to the bride's home, carrying a sealed letter.",
        caption: { en: "The letter sets out for the bride's home." },
      },
    },
    {
      id: "choosing_negotiators",
      title: "Choosing Negotiators (Uncles)",
      zuluTitle: "Ukukhethwa Kwabakhongi",
      summary:
        "Before anyone travels, the family chooses the abakhongi who will go to " +
        "ask for a good kinship: the umkhongi omkhulu who leads, the umkhongi " +
        "omncane who accompanies him, one or two young women, and the unobhala " +
        "who records the day.",
      description:
        "Ngaphambi kokuthi kuhanjiwe, kukhethwa abakhongi abazoya ukuyocela isihlobo esihle, kuhlanganisa umkhongi omkhulu, umkhongi omncane (omphelezeli), intokazi eyodwa noma ezimbili, kanye nonobhala.",
      details: [
        "Umkhongi omkhulu, umkhongi omncane (omphelezeli) bakhethwa.",
        "Intokazi eyodwa noma ezimbili zikhethwa ukuze ziphethe izipho zikamakoti.",
        "Unobhala ubhala konke okwenzekayo kulosuku.",
      ],
      // isiZulu caption to come from the cultural owner
      media: {
        kind: "illustration",
        src: "/scenes/choosing-negotiators.svg",
        alt: "Under a large tree, the groom's family sits in an arc and chooses the negotiators: two men, two young women and the scribe with a notebook.",
        caption: { en: "The family chooses who will go." },
      },
    },
    {
      id: "negotiations_day_umcelo",
      title: "Negotiations Day",
      zuluTitle: "Usuku Lwamalobo (Umcelo)",
      description:
        "Ngosuku olubekiwe, abakhongi bayavuka ekuseni baya esangweni lakubo kwentombi, babize izithakazelo, bese beqala izinkulumo zokucela isihlobo.",
      details: [
        'Bafika esangweni, babize izithakazelo zabo, bethi "sikhulekile ekhaya kwanozibanibani asizile ngempi sizocela isihlobo esihle".',
        "Kujwayelekile ukuthi banganakwa isikhathi eside kuze kube bavulelwa esangweni.",
        "Kuthunyelwa ingane ivule isango bese ihlala noma ilale phambi kwalo.",
        "Abakhongi bakhipha izipho noma imali ukuze ingane ivulele indlela.",
        "Babuza ukuthi balethwa yini, ubaba kamakoti uthule kuze kukhishwe imvulamlomo (izipho).",
        "Bamemeza ngezinkomo ezithile nezithile, bachaza uhlobo lwezinkomo.",
        "Kukhulunywa ngezinkomo zamalobolo, amanani azo, nezibizo zikamama nesikababa.",
        "Umkhosi uqeda usuku, umakoti engena ehamba nezinye izintombi embozile, abakubo kwensizwa bamkhethe phakathi kwezinye izintombi.",
        "Kucelwa incwadi yezibizo noma kuvunyelwane ukuthi kuzoqalwa ngezibizo noma kuqalwe ngamalobolo.",
      ],
      scene: {
        narration:
          "At first light, the groom's chosen negotiators arrive at the gate of the " +
          "bride's home. They do not simply knock. They announce themselves by calling " +
          "the family's praises, making clear they have come in peace, to ask for kinship. " +
          "It is common to be kept waiting at the gate for a long time; a child may be " +
          "sent to sit or lie before it, and the negotiators offer a small gift to open " +
          "the way. Only then do the discussions of kinship, and of the cattle, begin.",
        voice: {
          zu: "Sikhulekile ekhaya kwanozibanibani, asizile ngempi — sizocela isihlobo esihle.",
          en: "We greet this home; we have not come with war — we come to ask for a good kinship.",
          note: "Called out at the gate as the negotiators announce themselves.",
        },
        roles: [
          {
            term: "Umkhongi omkhulu",
            gloss:
              "The chief negotiator — the lead uncle who speaks for the family",
          },
          {
            term: "Umkhongi omncane / umphelezeli",
            gloss: "The junior negotiator who supports and accompanies him",
          },
          {
            term: "Unobhala",
            gloss: "The scribe who records everything agreed on the day",
          },
          {
            term: "Intombi",
            gloss: "The young woman (or two) who carry the bride's gifts",
          },
        ],
        beats: [
          {
            en: "The negotiators reach the gate and call the family's praises (izithakazelo).",
            zu: "Bafika esangweni, babize izithakazelo zabo.",
          },
          {
            en: "They are deliberately kept waiting, sometimes for a long time, before the gate is opened.",
            zu: "Kujwayelekile ukuthi banganakwa isikhathi eside kuze kube bavulelwa esangweni.",
          },
          {
            en: "A child is sent to sit or lie before the gate; the negotiators offer a small gift to open the way.",
            zu: "Kuthunyelwa ingane ivule isango; abakhongi bakhipha izipho ukuze ingane ivulele indlela.",
          },
          {
            en: "The bride's father stays silent until the imvulamlomo — the 'mouth-opening' gift — is given.",
            zu: "Ubaba kamakoti uthule kuze kukhishwe imvulamlomo (izipho).",
          },
          {
            en: "Talk turns to the cattle — their kinds, their number, and the gifts owed to the mother and father.",
            zu: "Kukhulunywa ngezinkomo zamalobolo, amanani azo, nezibizo zikamama nesikababa.",
          },
        ],
        media: {
          kind: "illustration",
          src: "/scenes/umcelo.svg",
          alt: "The two families sit facing each other at the bride's home, between two huts.",
          // isiZulu caption to come from the cultural owner; the old one
          // described the gate, not this scene
          caption: {
            en: "The two families meet at the bride's home.",
          },
        },
        variesNote:
          "Commonly this is how the day unfolds — but families and regions differ, and each " +
          "home has its own way. Treat this as a guide, not a rule.",
      },
    },
    {
      id: "gifting_of_bride_family_umembeso",
      title: "Gifting of Bride Family",
      zuluTitle: "Umembeso",
      summary:
        "What follows is ushukela, which some places call izikhwehlela. Some " +
        "families combine it with umembeso, or with the izibizo, the gifts the " +
        "bride's family has asked for.",
      description:
        "Okulandelayo kube ngoshukela (ezinye izindawo zibiza ngezikhwehlela), abanye bakuhlanganisa nomembeso noma ngezibizo.",
      details: [
        "Umama kamkhwenyana uletha umbondo wezipho nezimpahla ezibhalwe encwadini yezibizo.",
        "Kukhona nembuzi ebizwa ngobikibiki.",
        "Abanye bahlaba imbuzi behlabela umkhwenyana ukuze adle kulomuzi uma engenile.",
        "Umkhwenyana uhamba nezinsizwa aye kubo kamakoti, bangena emuva komama abeletha izibizo.",
        "Umkhwenyana akadli imbuzi engakanikwa.",
        "Kuhlanganiswa nomemulo lapho intombi ikhuliswe khona, iyosina esigcawini ngomkhonto owulandwa kwensizwa.",
        "Umemulo unesigcawu, isikhathi siyahlukahluka ngezigodi.",
        "Kuyabuyelwa ekhaya lapho intombi ikhehlwa khona endlini ifakwe insoyi noma inkehli ekhanda.",
        "Umkhehlo wenziwa ngembuzi.",
      ],
      // isiZulu caption to come from the cultural owner
      media: {
        kind: "illustration",
        src: "/scenes/umembeso.svg",
        alt: "The groom's mother, in a wide red hat, leads the groom and young men carrying a trunk, mats and a goat to the bride's home, where her family waits at the door.",
        caption: { en: "The groom's mother leads the gifts to the bride's home." },
      },
    },
    {
      id: "ukubonwa_kwezinkomo",
      title: "Bride Family Going to See Cows at Groom's Home",
      zuluTitle: "Ukubonwa Kwezinkomo",
      summary:
        "After this ceremony, the bride's family choose whether to begin with " +
        "the cattle or with the izibizo, and the families agree on the ilobolo " +
        "cattle, their number, and the days they will be delivered.",
      description:
        "Emuva kwalomcimbi, abakwamakoti bafuna ukuqala ngezinkomo noma ngezibizo, kuvunyelwane ngezinkomo zamalobolo, amanani, nezinsuku zokuhanjiswa.",
      details: [
        "Abakwamakoti babizwa bezobona izinkomo zamalobolo.",
        "Kukhishwa usuku lokuthi izinkomo zizohanjiswa nini kubo kamakoti.",
      ],
      // isiZulu caption to come from the cultural owner
      media: {
        kind: "illustration",
        src: "/scenes/ukubonwa-kwezinkomo.svg",
        alt: "At the groom's home, the bride's family stands beside the cattle kraal looking at the Nguni cattle while a man of the groom's family shows them the herd.",
        caption: { en: "The bride's family come to see the cattle." },
      },
    },
    {
      id: "makoti_delivers_gift_umbondo",
      title: "Makoti Delivers Gift",
      zuluTitle: "Umbondo",
      summary:
        "Once the cattle have been delivered, the bride goes with veiled young " +
        "women to take umbondo, also called ingqibamasondo, to the groom's home.",
      description:
        "Ngemva kokuhanjiswa kwezinkomo, umakoti uhamba nezintombi ezimbozile ukuhambisa umbondo noma ingqibamasondo kubo kamkhwenyana.",
      details: [
        "Umbondo uhanjiswa ebusuku, kuvame ukuhambisana nomshado.",
        "Umbondo uqukethe ukudla okuningi nezinto ezibalulekile.",
      ],
      // isiZulu caption to come from the cultural owner
      media: {
        kind: "illustration",
        src: "/scenes/umbondo.svg",
        alt: "At night under a crescent moon, the bride and veiled young women walk in a line carrying pots and baskets of food on their heads to the groom's home, its doorway glowing.",
        caption: { en: "Umbondo is carried to the groom's home by night." },
      },
    },
    {
      id: "wedding_day_umabo_umshado",
      title: "Wedding Day",
      zuluTitle: "Umshado",
      summary:
        "A wedding day is set and the bride's party arrives in procession. " +
        "On the dance ground (isigcawu) the chief's policeman asks the bride whether she " +
        "loves the groom. She answers by starting a song and dancing " +
        "(ukusina), then gives the policeman a mat as a sign of her agreement. " +
        "Later that same day she gives umabo, her gifts to the groom's family.",
      description:
        "Kukhishwa usuku lomshado, umakoti nozakwabo bahamba nomkhosi, kwenziwa imicimbi yesiko, kuhlanganisa ukucula, ukudansa, nokuvuma umthetho womshado.",
      details: [
        "Kukhishwa usuku kubo kamakoti ukuthi ngosuku oluthile sizonilethela intombi eseniyilobolile naqeda ukuzofeza noma ukuzoqedela ubuhlobo obuhle obakhiwayo.",
        "Kuvunyelwane bese kubo kamakoti kuphume umthimba okungabantu abahamba ezintathakusa kanye nomakoti.",
        'Umthimba ufika kusalelwe kubo kamkhwenyana, bangene nomakoti kukhuzwe umntwana kuthiwa "uphi umntwana".',
        "Abantu bomthimba bagijima beshaya izindlu.",
        "Kwenziwa usiko lwakhona, bese bephuma bekhonjiswa isihlahla ngaphandle komuzi, lapho bezohlalakhona usuku lonke nomakoti aze avunule.",
        "Umakoti uya esigcawini esikhonjwe abakwamkhwenyana, lapho ezosina khona.",
        "Kufike amabutho endawo azodabula isigcawu ephethe amahawu ekhuza izaga.",
        'Iphoyisa lenkosi libuza ukuthi "Makoti (amubize ngegama lakhe) uyabuza umthetho x3, uyamuthanda na umkhwenyana (amubize ngegama nesibongo)?"',
        "Umakoti eqamba icule acule asine aze afike ephoyiseni alinike icansi, eliphethe okukhombisa ukuvuma ukuthi uyamthanda.",
        "Ngaphambi kokuthi kuze kuyiwe esigcawini, ekuseni kuhlatshwe inkomo kubo kamkhwenyana.",
        "Umakoti uyangena esibayeni azobhobosa isisu senkomo, kwenziwe nolunye usiko kanjalo kanjalo.",
        "Uma sekubuyiwe esigcawini, umakoti uyaba (umabo), aphe izipho okuyizingubo, amacansi, amaphinifa, nayo yonke into enikazi abantu basemzini.",
        "Lokhu kwenzelwa esibayeni, bese emuva kwalokho umshado usuphelele, sekuyadliwa bayaphuza abaphuzayo kuze kuphele usuku.",
      ],
      // isiZulu caption to come from the cultural owner
      media: {
        kind: "illustration",
        src: "/scenes/umabo.svg",
        alt: "On the wedding day the bride dances a high kick on the dance ground while people gather behind her and men of the amabutho stand on both sides with shields.",
        caption: { en: "The bride dances on the wedding day." },
      },
    },
  ],
};
