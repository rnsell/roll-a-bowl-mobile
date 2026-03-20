import { graphql } from '../generated';

// ── Shared Queries ───────────────────────────────────────────────────

export const GetAisles = graphql(`
  query GetAisles {
    aisles {
      id
      name
      slug
      sortOrder
    }
  }
`);

// ── Personal Queries ─────────────────────────────────────────────────

export const GetShoppingList = graphql(`
  query GetShoppingList($input: GetShoppingListInput!) {
    shoppingList(input: $input) {
      id
      startDate
      endDate
      aisleGroups {
        aisle {
          id
          name
          slug
          sortOrder
        }
        allChecked
        items {
          id
          name
          quantity
          measurement {
            id
            name
            abbreviation
          }
          source
          isChecked
          sortOrder
        }
      }
      createdAt
      updatedAt
    }
  }
`);

// ── Personal Mutations ───────────────────────────────────────────────

export const GenerateShoppingList = graphql(`
  mutation GenerateShoppingList($input: GenerateShoppingListInput!) {
    generateShoppingList(input: $input) {
      id
      startDate
      endDate
    }
  }
`);

export const RegenerateShoppingList = graphql(`
  mutation RegenerateShoppingList($input: RegenerateShoppingListInput!) {
    regenerateShoppingList(input: $input) {
      id
      startDate
      endDate
    }
  }
`);

export const ToggleShoppingListItem = graphql(`
  mutation ToggleShoppingListItem($input: ToggleShoppingListItemInput!) {
    toggleShoppingListItem(input: $input) {
      id
      isChecked
      checkedAt
    }
  }
`);

export const AddShoppingListItem = graphql(`
  mutation AddShoppingListItem($input: AddShoppingListItemInput!) {
    addShoppingListItem(input: $input) {
      id
      name
      quantity
      isChecked
      source
    }
  }
`);

export const RemoveShoppingListItem = graphql(`
  mutation RemoveShoppingListItem($input: RemoveShoppingListItemInput!) {
    removeShoppingListItem(input: $input)
  }
`);

// ── Family Queries ───────────────────────────────────────────────────

export const GetFamilyShoppingList = graphql(`
  query GetFamilyShoppingList($input: GetFamilyShoppingListInput!) {
    familyShoppingList(input: $input) {
      id
      startDate
      endDate
      aisleGroups {
        aisle {
          id
          name
          slug
          sortOrder
        }
        allChecked
        items {
          id
          name
          quantity
          measurement {
            id
            name
            abbreviation
          }
          source
          isChecked
          sortOrder
        }
      }
      createdAt
      updatedAt
    }
  }
`);

// ── Family Mutations ─────────────────────────────────────────────────

export const GenerateFamilyShoppingList = graphql(`
  mutation GenerateFamilyShoppingList($input: GenerateFamilyShoppingListInput!) {
    generateFamilyShoppingList(input: $input) {
      id
      startDate
      endDate
    }
  }
`);

export const RegenerateFamilyShoppingList = graphql(`
  mutation RegenerateFamilyShoppingList($input: RegenerateFamilyShoppingListInput!) {
    regenerateFamilyShoppingList(input: $input) {
      id
      startDate
      endDate
    }
  }
`);

export const ToggleFamilyShoppingListItem = graphql(`
  mutation ToggleFamilyShoppingListItem($input: ToggleFamilyShoppingListItemInput!) {
    toggleFamilyShoppingListItem(input: $input) {
      id
      isChecked
      checkedAt
    }
  }
`);

export const AddFamilyShoppingListItem = graphql(`
  mutation AddFamilyShoppingListItem($input: AddFamilyShoppingListItemInput!) {
    addFamilyShoppingListItem(input: $input) {
      id
      name
      quantity
      isChecked
      source
    }
  }
`);

export const RemoveFamilyShoppingListItem = graphql(`
  mutation RemoveFamilyShoppingListItem($input: RemoveFamilyShoppingListItemInput!) {
    removeFamilyShoppingListItem(input: $input)
  }
`);
