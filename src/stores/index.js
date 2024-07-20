import { usePecasStore } from "@/stores/estoque/pecas";
import { useEntradasStore} from "@/stores/estoque/entradas";
import { useSaidasStore } from "@/stores/estoque/saidas";
import { useClientesStore } from "@/stores/others/clientes";
import { useServicosStore } from "@/stores/others/servicos";
import { useOrcamentosStore } from "@/stores/others/orcamentos";

export { usePecasStore, useClientesStore, useEntradasStore, useSaidasStore, useServicosStore, useOrcamentosStore};