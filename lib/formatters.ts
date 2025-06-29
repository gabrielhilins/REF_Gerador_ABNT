const monthNames = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."]

export const formatAuthorForDisplay = (
  value: string,
  fieldName: string,
  allowMultiple = false,
  hasMoreThanThreeAuthors: Record<string, boolean>,
  selectedType: string,
): string => {
  if (!value.trim()) return "[Autor não informado]"

  if (selectedType === "website" && fieldName === "author") {
    return value.trim()
  }

  const authors = value
    .split(";")
    .map((author) => author.trim())
    .filter((author) => author)

  if (allowMultiple && hasMoreThanThreeAuthors[fieldName] && authors.length > 0) {
    const firstAuthor = authors[0]
    const parts = firstAuthor.split(",").map((part) => part.trim())

    if (parts.length >= 2) {
      const surname = parts[0].toUpperCase()
      const firstName = parts.slice(1).join(" ").trim()
      return firstName
        ? `${surname}, ${firstName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")} et al.`
        : `${surname} et al.`
    } else {
      const words = firstAuthor.split(" ").filter((word) => word.trim())
      if (words.length === 1) {
        return `${words[0].toUpperCase()} et al.`
      }
      const surname = words[words.length - 1].toUpperCase()
      const firstName = words
        .slice(0, -1)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
      return `${surname}, ${firstName} et al.`
    }
  }

  const formattedAuthors = authors
    .map((author) => {
      const parts = author.split(",").map((part) => part.trim())

      if (parts.length >= 2) {
        const surname = parts[0].toUpperCase()
        const firstName = parts.slice(1).join(" ").trim()
        return firstName
          ? `${surname}, ${firstName
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")}`
          : surname
      } else {
        const words = author.split(" ").filter((word) => word.trim())
        if (words.length === 1) {
          return words[0].toUpperCase()
        }
        const surname = words[words.length - 1].toUpperCase()
        const firstName = words
          .slice(0, -1)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ")
        return `${surname}, ${firstName}`
      }
    })
    .filter((author) => author !== "")

  return formattedAuthors.join("; ") || "[Autor não informado]"
}

export const formatDate = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  const limited = numbers.slice(0, 8)

  if (limited.length >= 3 && limited.length <= 4) {
    return `${limited.slice(0, 2)}/${limited.slice(2)}`
  } else if (limited.length >= 5) {
    return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`
  }
  return limited
}

export const formatDateForReference = (dateStr: string): string => {
  if (!dateStr || dateStr.length < 8) return "[Data não informada]"

  const [day, month, year] = dateStr.split("/")
  const monthIndex = Number.parseInt(month) - 1

  if (monthIndex >= 0 && monthIndex < 12) {
    return `${day} ${monthNames[monthIndex]} ${year}`
  }
  return "[Data inválida]"
}

export const formatYear = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 4)
}

export const formatPages = (value: string): string => {
  return value.replace(/[^\d-]/g, "")
}

export const formatUrl = (value: string): string => {
  if (value && !value.startsWith("http://") && !value.startsWith("https://")) {
    return `https://${value}`
  }
  return value
}

export const formatEdition = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 2)
}
