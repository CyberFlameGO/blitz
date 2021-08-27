import {Generator, GeneratorOptions, SourceRootType} from "../generator"
import {camelCaseToKebabCase, singleCamel, singlePascal} from "../utils/inflector"

export interface FormGeneratorOptions extends GeneratorOptions {
  ModelName: string
  ModelNames: string
  modelName: string
  modelNames: string
  parentModel?: string
  parentModels?: string
  ParentModel?: string
  ParentModels?: string
  extraArgs?: string[]
}

export class FormGenerator extends Generator<FormGeneratorOptions> {
  static subdirectory = "queries"
  sourceRoot: SourceRootType = {type: "template", path: "form"}

  private getId(input: string = "") {
    if (!input) return input
    return `${input}Id`
  }

  private getParam(input: string = "") {
    if (!input) return input
    return `[${input}]`
  }

  // eslint-disable-next-line require-await
  async getTemplateValues() {
    return {
      parentModelId: this.getId(this.options.parentModel),
      parentModelParam: this.getParam(this.getId(this.options.parentModel)),
      parentModel: this.options.parentModel,
      parentModels: this.options.parentModels,
      ParentModel: this.options.ParentModel,
      ParentModels: this.options.ParentModels,
      modelId: this.getId(this.options.modelName),
      modelIdParam: this.getParam(this.getId(this.options.modelName)),
      modelName: this.options.modelName,
      modelNames: this.options.modelNames,
      ModelName: this.options.ModelName,
      ModelNames: this.options.ModelNames,
      fieldTemplateValues: this.options.extraArgs?.map((arg: string) => {
        const [valueName, type] = arg.split(":")
        // Get component from blitz config using type map
        return {
          inputComponent: "Component TODO", // get component based on type. TODO: Override argument 3?
          fieldName: singleCamel(valueName),
          FieldName: singlePascal(valueName).replace(/(?!^)([A-Z])/g, " $1"),
          field_name: "f_n TODO", // 
          Field_name: "F_n TODO", // 
          Field_Name: "F_N TODO", // 
        }
      }),
    }
  }

  getTargetDirectory() {
    const context = this.options.context ? `${camelCaseToKebabCase(this.options.context)}/` : ""
    const kebabCaseModelName = camelCaseToKebabCase(this.options.modelNames)
    return `app/${context}${kebabCaseModelName}/components`
  }
}
