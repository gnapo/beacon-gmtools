interface replacementAction {
  pattern: RegExp
  replacer: (match: string, p1: string) => string
}


export const doReplacements = (initialString: string, replacements: replacementAction[]): string => {
  if (replacements.length === 0) {
    return initialString
  }
  let modifiedString = initialString
  replacements.forEach((replacement) => {
    modifiedString = modifiedString.replace(replacement.pattern, replacement.replacer)
  })
  return modifiedString
}

export const replacePhaseNumberInTop = {
  pattern: /\((\d+)\)/g,
  replacer: (match: string, number: string) => {
    return `<span class="phase-number">${number}</span>`
  }
}

export const putLinebreaksOnLists = {
  pattern: /\D (-) /g,
  replacer: (match: string, group: string) => {
    return ` <br> ✦ `
  }
}

export const replaceBoldText = {
  pattern: /(On (Hit|Crit|Release|Channel):|Trigger:|Effect:|resistance to (that damage|Astral and Lunar|all damage|any damage from the attack)|resistances?|Discord|Unbreakable|immune|(difficulet|dangerous) terrain|(M|m)inor Action:|Summons?|hard cover|Armor|Stress|\d Stress|Enchantments?|bonus|Physical|Astral|Lunar|free action|critical hits?|low visibility|Reroll Table|(Short )?Rests?|1\/turn|1\/round|Blast|Burst|Close Blast|Line|shift .|reactions?|Failure:|Success:|flight|Traps?|concentration save|Any.*:|Aquatic Adaptation|climb(ing)?|teleport|limit break|Reliable)/g,
  replacer: (match: string, group: string) => {
    return `<span class="bold">${group}</span>`
  }
}

export const replaceAccuracy = {
  pattern: /\+(\d) Accuracy/g,
  replacer: (match: string, group: string) => {
    return `<span class="bold">+${group}<span class="accuracy">+</span></span>`
  }
}

export const replaceDifficulty = {
  pattern: /\+(\d) Difficulty/g,
  replacer: (match: string, group: string) => {
    return `<span class="bold">+${group}<span class="accuracy">-</span></span>`
  }
}

export const replaceSummonStatblock = {
  pattern: /(\(Size.*\))/g,
  replacer: (match: string, group: string) => {
    return `<span class="literata-sc">${group}</span>`
  }
}

export const replacePills = {
  pattern: /\[([^\]]*)]/g,
  replacer: (match: string, group: string) => {
    return `<span class="colored-pill">${group}</span>`

  }
}

export const replaceActionDescriptors = {
  pattern: /([A-Z]* \(\d\) [A-Z]*)/g,
  replacer: (match: string, group: string) => {
    return `<span class="colored-text">${group}</span>`
  }
}

export const replacePhaseNumberInDescription = {
  pattern: /\((\d)\)/g,
  replacer: (match: string, group: string) => {
    return `<span class="phase-number-descr">${group}</span>`
  }
}

export const replaceCapitalRulesPhrases = {
  pattern: /([A-Z-]{2,})/g,
  replacer: (match: string, group: string) => {
    if (group.length > 2) {
      const firstLetter = group.substring(0, 1)
      const rest = group.substring(1)
      return `<span class="literata-sc"><span class="slightly-bigger">${firstLetter}</span>${rest}</span>`
    }
    return `<span class="literata-sc">${group}</span>`
  }
}

export const replaceBoldTextInSupplies = {
  pattern: /((Minor|Free) Action|\(?1\/quest\)?:?|1\/quest|\d\/round|1\/scene|Strain|Stress|On Hit:|Consumable|resistance to|immune to| Astral and Lunar|Astral|Physical|Force|Lunar|all damage from spells|Short Rests?|Aquatic Adaptation|Reliable \d|\+\d (bonus)? damage|to the other damage|Trap|Aetheric|flight|Summons)/g,
  replacer: (match: string, group: string) => {
    return `<span class="bold">${group}</span>`
  }
}

export const replaceAccuracyInSupplies = {
  pattern: /\+(\d) ACC/g,
  replacer: (match: string, group: string) => {
    return `<span class="bold">+${group}<span class="accuracy">+</span></span>`
  }
}

export const replaceDifficultyInSuppliey = {
  pattern: /\+(\d) DIF/g,
  replacer: (match: string, group: string) => {
    return `<span class="bold">+${group}<span class="accuracy">-</span></span>`
  }
}

export const replacePillsinSupplies = {
  pattern: /\[([^\]]*)]/g,
  replacer: (match: string, group: string) => {
    return `<span class="supplies-pill">${group}</span>`

  }
}

export const replacePhaseNumberInSupplies = {
  pattern: /\((\d)\)/g,
  replacer: (match: string, group: string) => {
    return `<span class="phase-number-supplies">${group}</span>`
  }
}

export const replacePipeWithStar = {
  pattern: /(\|)/g,
  replacer: (match: string, group: string) => {
    return `✦`
  }
}
